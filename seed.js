// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var tweet_list = [
  {
  twitterName: "@elonmusk",
  tweetText: "Gonna put an old school drive-in, roller skates & rock restaurant at one of the new Tesla Supercharger locations in LA",
  },
  {
  twitterName: "elonmusk",
  tweetText: "Using a neural net to detect rain using cameras (no dedicated rain or sun sensors). Computers are very patient.",
  },
  {
  twitterName: "elonmusk",
  tweetText: "Come work at the biggest & most advanced factory on Earth! Located by a river near the beautiful Sierra Nevada mountains with wild horses roaming free.",
  },
  {
  twitterName: "sarahksilverman",
  tweetText: "When you say that most news outlets are fake it’s kind of like saying you have “terrible luck w roommates,” like Dood it’s not them it’s you",
  },
  {
  twitterName: "sarahksilverman",
  tweetText: "We can send a man to the moon but I pee and now my tampon string is wet. How have we not figured this out?",
  },
  {
  twitterName: "sarahksilverman",
  tweetText: "Trump says the media is treating him like Reagan in saying he is mentally incompetent or has dementia. We found out later Reagan's undisclosed Alzheimer's had put America at risk for years. #stablegenius",
  },
  {
  twitterName: "DrakeReact",
  tweetText: "Snapchat should make an option to set a certain notification noise for each person so you know if its worth turning over for in bed at night",
  },
  {
  twitterName: "DrakeReact",
  tweetText: "using microsoft word*moves an image 1 mm to the left*all text and images shift. 4 new pages appear. in the distance, sirens.",
  },
  {
  twitterName: "DrakeReact",
  tweetText: "I don't know ed sheeran personally but he's managed to put me through more emotions than anyone else has in my whole life",
  },
];

db.Tweet.remove({}, function(err, authors) {
  console.log('removed all tweets');
  db.Tweet.create(tweet_list, function(err, tweets){
    if (err) {
      console.log(err);
      return;
    }
    console.log('recreated all tweets');
    console.log("created", tweets.length, "tweets");
  });
});
