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
        until: '2018-11-11',
        max_id: maxID,
    }, function (error, tweets, response) {

        var tweetobjs;
        var tweet = {
            text: text,
            location: location,
        };

        // return obj
        var data = tweets.statuses;
        //var arr = [];

        // place tweets in array
        if (error) throw error;
        for (let i = 0; i < data.length; i++) {
            let text = tweets.statuses[i].text;
            let location = tweets.statuses[i].user.location;
            obj.arr.push({text: text, location: location});
            arr.push(text);
            console.log(arr);
        }
        console.log(tweets.statuses);
        var next_results_url_params = tweets.search_metadata.next_results;
        if (next_results_url_params == null) return null;

        var next_max_id = next_results_url_params.split('max_id=')[1].split('&')[0];
        //var list = tweets.statuses;

        // write tweets to text file
        var fs = require('fs');

        var file = fs.createWriteStream('data/tweets.json', {'flags': 'a'});
        file.on('error', function(err) { /* error handling */ });
        for (let i = 0; i < arr.length; i++) {
            file.write(arr[i] + '\n');
        }
        file.end();
        maxID = next_max_id;

        retrieveTweetsBatch(maxID);

        //return list + allTweets;
        return arr;
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
