let tweetModel = require('../models/tweet');

function getTweets(req,res){
  let page = req.query.page;
  if (page) {page = parseInt(page)}
  let limit = req.query.limit || 20;
  if (limit) {limit = parseInt(limit)}

  let skip = (page - 1) * 20;

  db.Tweet.find({},{},{skip:skip,limit:limit,sort:{'_id':-1}},function(err, tweets){
    if (err) {
      res.status(500).json({error:err.message});
    }
    res.json(tweets);
  });
}

function generate(req,res){
  //Set twitter account name based on value passed
  let twitterName = req.query.TN || null;

  //initialize tweet2Markov obj type
  const TwitterBot = require('../tweet2Markov')

  //options for tweet2Markov instance
  const options = {
    account: twitterName,
    twitter: {
      consumer_key: '0TdIxcIp7J1RIeC1quYVbyf7P',
      consumer_secret: 'GpxeM3hCDw09JbABkclHFuoO6ZaQ0rTDlCK5KxVCpavRI3RvT3',
      access_token_key: '125541213-aQuoA5cGO13SbU4pdgDGeM8k7hsxCBJNueoA07ML',
      access_token_secret: 'AeauKFxNOt1xkn8vKyAU8pehtnywghMhR6bDiCKsSxQDq'
    }
  }
  //tweet2Markov instance
  let bot = new TwitterBot( options );
  //retrieve tweets
  bot.getTweets(() => {
    //generate Markov chain from retrieved tweets
    let tweetText = bot.generateTweet();
    //add to db
    //let Tweet = tweetModel('tweet',TweetSchema);
    //tweet = new Tweet()
    db.Tweet.create({tweetText:tweetText,twitterName:twitterName}, function(err, tweet) {
      if (err) { console.log('error', err); }
      console.log(tweet);
      res.send(tweet);
    });
  });
}

module.exports = {
  getTweets: getTweets,
  generate: generate,
}
