// server.js
  // SERVER-SIDE JAVASCRIPT
  let express = require('express');
  let bodyParser = require('body-parser');
  let app = express();
  db = require('./models');
  //Middleware
  app.use(express.static('public'));

  // Allow CORS: we'll use this today to reduce security so we can more easily test our code in the browser.
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  // init controllers
  let controllers = require('./controllers');

  //URL ROuting
  app.get('/', function (req, res) {
    res.sendFile('public/views/index.html' , { root : __dirname});
  });

  app.get('/getTweets', controllers.ctrl_tweet2Markov.getTweets);

  app.get('/generate', controllers.ctrl_tweet2Markov.generate);

  //Sets default listener to port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('app listening at http://localhost:3000/');
  });
