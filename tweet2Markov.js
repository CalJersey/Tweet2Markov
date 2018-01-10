const Twitter = require('twitter')
const MarkovGen = require('markov-generator')
const tipots = require('this-is-probably-ok-to-say')
const unescape = require('lodash.unescape')

class TwitterBot {

  constructor (options) {
    this.arrayOfTweets = []
    this.options = {
      account: '',
      twitter: {
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
      },
      bannedWords: [],
      includeAts: true,
      includeHashtags: true,
    }

    Object.assign(this.options, options)

    if (!this.options.account) {
      throw new Error('No twitter account handle was assigned in options')
    }

    this.twitterClient = this.createTwitterClient()

  }

  createTwitterClient () {
    let noMissingKeys = true
    let missingKey
    let expectedStructure = {
      consumer_key: '',
      consumer_secret: '',
      access_token_key: '',
      access_token_secret: ''
    }

    // make sure api keys are not false
    for (let key in this.options.twitter) {
      if (!this.options.twitter[key]) {
        noMissingKeys = false
      }
    }

    // make sure all 4 expected keys are present
    for (let key in expectedStructure) {
      if (!this.options.twitter[key]) {
        noMissingKeys = false
        missingKey = key
      }
    }

    // set this.twitterClient to a new instance of the twitter api object
    if (noMissingKeys) {
      return new Twitter({
        consumer_key: this.options.twitter.consumer_key,
        consumer_secret: this.options.twitter.consumer_secret,
        access_token_key: this.options.twitter.access_token_key,
        access_token_secret: this.options.twitter.access_token_secret
      })
    // otherwise return an error
    } else {
      if (missingKey) {
        throw new Error('Missing twitter API key: ' + missingKey)
      }
      throw new Error('Missing twitter API keys!')
    }
  }

  checkForBannedWords (tweet) {
    let lower = tweet.toLowerCase()
    this.options.bannedWords.forEach((e) => {
      if (lower.includes(e.toLowerCase)) {
        return true
      }
    })
    return false
  }

  checkForAts (tweet) {
    if (!this.options.includeAts) {
      return tweet.includes('@')
    } else {
      return false
    }
  }

  checkForHashtags (tweet) {
    if (!this.options.includeHashtags) {
      return tweet.includes('#')
    } else {
      return false
    }
  }

  getTweets (cb) {
    let lastID
    let count = 0
    let get = (max_id) => {
      this.twitterClient.get('statuses/user_timeline', {screen_name: this.options.account, max_id: max_id, count: 200, exclude_replies: true, include_rts: false}, (error, timeline, response) => {
        if (error) throw new Error(error)
        timeline.forEach((e, i, a) => {
          const tweetText = unescape(e.text)
          if (!this.arrayOfTweets.includes(tweetText)) {
            this.arrayOfTweets.push(tweetText)
          }
          if (i === a.length - 1) {
            lastID = e.id
          }
        })
        count++
        if (count <= 15) {
          get(lastID)
        }
        if (count === 16) {
          if (cb) { return cb(this.arrayOfTweets) }
          else { return this.arrayOfTweets }
        }
      })
    }
    get()
    //console.log(`arrayOfTweets=${this.arrayOfTweets}`)
  }

  generateTweet (callback) {
    if (!this.arrayOfTweets.length) {
      console.log('arrayOfTweets was empty!')
      this.getTweets()
    }
    //console.log(`arrayOfTweets=${this.arrayOfTweets}`);
    let markov = new MarkovGen({
      input: this.arrayOfTweets,
      minLength: 6
    })
    //console.log(`markov=${JSON.stringify(markov)}`);
    let tweet = markov.makeChain()
    //console.log(`tweet=${tweet}`);
    while (tweet.length > 140 || !tipots(tweet) || this.checkForBannedWords(tweet) || this.checkForAts(tweet) || this.checkForHashtags(tweet)) {
      tweet = markov.makeChain()
    }

    if (callback) { return callback(tweet) }

    return tweet
  }
}

module.exports = TwitterBot
