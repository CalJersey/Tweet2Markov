// server.js
  // SERVER-SIDE JAVASCRIPT
  let express = require('express');
  let bodyParser = require('body-parser');
  let app = express();

  // server.js

  //Middleware
  app.use(express.static('public'));

  // Allow CORS: we'll use this today to reduce security so we can more easily test our code in the browser.
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  //URL ROuting
  app.get('/', function (req, res) {
    res.sendFile('/public/views/index.html' , { root : __dirname});
  });

  app.get('/generate', function(req,res){
    //Set twitter account name based on value passed
    let TwitterName = req.query.TN || null;

    //initialize tweet2Markov obj type
    const TwitterBot = require('./Tweet2Markov')

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
  })

  //Sets default listener to port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('app listening at http://localhost:3000/');
  });
