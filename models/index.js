let mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tweet2Markov");

module.exports.Tweet = require("./tweet.js");
