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
    client.get('search/tweets', {
        q: 'griep since:2017-05-10',
        count: '100',
        lang: 'nl',
    }, function (error, tweets, response) {
        if (error) throw error;
        console.log(tweets);
        var nextToken = tweets.search_metadata.next_results;

        //retrieve first 100 tweets from query
        for (var i = 0; i < 100; i++) {
            //console.log(tweets.statuses[i].text);
            var lowestID = tweets.statuses[i].id;
            //console.log(lowestID);
            if( tweets.statuses[i].id < lowestID ){
                lowestID = tweets.statuses[i].id;
            }
        }

        //loop over all pages and retrieve all tweets
        for (var i = 0; i < 4; i++) {

            client.get('search/tweets', {
                q: 'griep since:2017-05-10',
                count: '100',
                lang: 'nl',
                next: encodeURIComponent(nextToken),
            }, function (error, tweets, response) {
                if (error) throw error;

                nextToken = tweets.search_metadata.next_results;
                count = tweets.search_metadata.count;

                for (var i = 0; i < 100; i++) {
                    console.log(tweets.statuses[i].text);
                }
            });
        }
    });

}

retrieveTweetsBatch();