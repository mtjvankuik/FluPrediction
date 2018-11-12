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

var retrieveTweetsBatch = function(token){
    var maxID = token;

    client.get('search/tweets', {
        q: 'flu -filter:retweets',
        count: '100',
        lang: 'en',
        until: '2018-11-11',
        geocode: '54.161342,-1.985778,600km',
        max_id: maxID,
    }, function (error, tweets, response) {

        var allTweets = [];

        // return obj
        var data = tweets.statuses;

        // place tweets in array
        if (error) throw error;

        for (let i = 0; i < data.length; i++) {
            //console.log(tweets.statuses[i].text);
            var tweet = {
                text: tweets.statuses[i].text,
                location: tweets.statuses[i].user.location,
            };
            allTweets.push(tweet);
        }

        //console.log(allTweets);

        var next_results_url_params = tweets.search_metadata.next_results;
        if (next_results_url_params == null) return null;

        var next_max_id = next_results_url_params.split('max_id=')[1].split('&')[0];

        //write tweets to text file
        var fs = require('fs');

        var file = fs.createWriteStream('data/tweets.txt', {'flags': 'a'});
        file.on('error', function(err) { /* error handling */ });
        for (let i = 0; i < allTweets.length; i++) {
            file.write(allTweets[i].text + '\n');
        }
        file.end();

        // replace next token with new maxID
        maxID = next_max_id;

        retrieveTweetsBatch(maxID);
        console.log(allTweets);
        //return list + allTweets;
        //exports.allTweets = allTweets;
        return allTweets;
    });
};

/**
 * Search all tweets using recursion and pagination
 * returns: JSON response
 **/
var receiveTweets = function(){
    var tweets = retrieveTweetsBatch();
    return tweets;

}

receiveTweets();

//exports.retrieveTweetsBatch = retrieveTweetsBatch(token);
exports.receiveTweets = receiveTweets;

