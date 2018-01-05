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
    //res.send(`You Picked:  ${req.params.color}`)
    let Doppel = require('doppel-tweet');
    let config = require('./twitter-keys');
    let TwitterName = req.query.TN;

    let donnie = new Doppel(TwitterName, config);
    donnie.update().then(function(){
     let phrase = donnie.generate();
     res.json(phrase);
    });
  })
  //
  // app.get('/thank/:name', function(req,res){
  //   let name = req.params.name;
  //   let favFood = req.query.favFood;
  //   res.send(`Hi ${name}. Here is a ${favFood}`);
  //
  // })
  //
  // app.get('/mult', function(req,res){
  //   let x = req.query.x;
  //   let y = req.query.y;
  //   let result = x*y;
  //   res.send(`${result} is the result.`);
  //
  // })
  //
  // app.get('/api/albums/:albumId', function (req, res) {
  //   res.send(`Album title: ${albums[req.params.albumId].title}`);
  // });
  //
  // app.get('/api/albums', function (req, res) {
  //   res.json(albums);
  //   console.log(req);
  //   console.log(res);
  // });
  //
  // app.get('/api/taco', function (req, res) {
  //   res.json(taquerias);
  //   console.log(req);
  //   console.log(res);
  // });



  //Sets default listener to port 3000
  app.listen(process.env.PORT || 3000, function () {
    console.log('app listening at http://localhost:3000/');
  });



//   // server.js
//   var albums = [
//     {
//       title: 'Cupid Deluxe',
//       artist: 'Blood Orange'
//     },
//     {
//       title: 'M3LL155X - EP',
//       artist: 'FKA twigs'
//     },
//     {
//       title: 'Fake History',
//       artist: 'letlive.'
//     }
//   ];
//
//   // server.js
// var taquerias = [
//   { name: "La Taqueria" },
//   { name: "El Farolito" },
//   { name: "Taqueria Cancun" }
// ];
