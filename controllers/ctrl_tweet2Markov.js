function getTweets(req,res){
  let page = req.query.page || 1;
  let limit = req.query.limit || 20;
  let skip = (page - 1) * 20;

  db.Tweet.find().skip(skip).limit(limit,function(err, tweets){
    if (err) {res.status(500).json({error:err.message});}
    res.json(tweets);
  });
}

function generate(req,res){
  //Set twitter account name based on value passed
  let TwitterName = req.query.TN || null;

  //initialize tweet2Markov obj type
  const TwitterBot = require('../Tweet2Markov')

  //options for tweet2Markov instance
  const options = {
    account: TwitterName,
    twitter: {
      consumer_key: '0TdIxcIp7J1RIeC1quYVbyf7P',
      consumer_secret: 'GpxeM3hCDw09JbABkclHFuoO6ZaQ0rTDlCK5KxVCpavRI3RvT3',
      access_token_key: '125541213-aQuoA5cGO13SbU4pdgDGeM8k7hsxCBJNueoA07ML',
      access_token_secret: 'AeauKFxNOt1xkn8vKyAU8pehtnywghMhR6bDiCKsSxQDq'
    }
  }
  //tweet2Markov instance
  let bot = new TwitterBot( options )
  //retrieve tweets
  bot.getTweets(() => {
    //generate Markov chain from retrieved tweets
    let tweet = bot.generateTweet()
    //send Markov chain as json response
    res.json(tweet)
  })
}

module.exports = {
  getTweets: getTweets,
  generate: generate,
}
