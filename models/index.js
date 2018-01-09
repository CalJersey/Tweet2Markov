var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/tweet2Markov");

module.exports.Tweet = require("./tweet.js");
