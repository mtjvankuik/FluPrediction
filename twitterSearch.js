// environment variables (see .env)
require('dotenv').config();

var Twitter = require('twitter');

/**
 * Client authentication
 **/
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Search tweets filtered by keyword
 * Keyword: q
 * returns: JSON response
 **/
function retrieveTweets() {
    client.get('search/tweets', {q: 'griep', fromDate: '201601010000', maxResults: 500, lang: 'nl'}, function(error, tweets, response) {
        if(error) throw error;
        console.log(tweets);
        console.log(response);
    });
}

retrieveTweets();