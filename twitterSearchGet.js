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
 * Search first batch of tweets filtered by keyword
 * Twitter Standard Search implementation
 * Tweets of last 7 days or less
 * returns: JSON response
 **/
function retrieveTweetsBatch(token){
    var maxID = token;

    client.get('search/tweets', {
        q: 'flu -filter:retweets',
        count: '100',
        lang: 'en',
        until: '2018-11-12',
        max_id: maxID,
    }, function (error, tweets, response) {

        // var obj = {
        //     tweets: []
        // }
        // obj.tweets.push({text: text});
        // return obj

        if (error) throw error;
        console.log(tweets.statuses);

        var next_results_url_params = tweets.search_metadata.next_results;
        if (next_results_url_params == null) return null;

        var next_max_id = next_results_url_params.split('max_id=')[1].split('&')[0];
        var list = tweets.statuses;

        maxID = next_max_id;

        var allTweets = retrieveTweetsBatch(maxID);

        return list + allTweets;
    });
};

module.exports = {

    /**
     * Search all tweets using recursion and pagination
     * returns: JSON response
     **/
    receiveTweets: function (){
        var data = retrieveTweetsBatch();
        return data;
    }
}
//receiveTweets();
