/**
 * Partly written by group, origin additional code : https://www.npmjs.com/package/twitter
 */

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
function retrieveTweetsBatch() {
    client.post('tweets/search/fullarchive/dev', {
        query: encodeURIComponent('flu'),
        //fromDate: '201701010000',
        //toDate: '201801010000',
        //maxResults: '100',
    }, function (error, tweets, response) {
        console.log(response);
        if (error) throw error;
        console.log(tweets);
    });
}

retrieveTweetsBatch();