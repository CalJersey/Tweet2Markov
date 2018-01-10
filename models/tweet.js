let mongoose = require('mongoose'),
Schema = mongoose.Schema;

let TweetSchema = new Schema({
  twitterName: String,
  tweetText: String,
});

var Tweet = mongoose.model('Tweet', TweetSchema);

module.exports = Tweet;
