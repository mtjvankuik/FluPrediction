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
     * Currently due to technical limitations recursion is off
     * @return: JSON response of 100 tweets
     **/

    var retrieveTweetsBatch = function (token, callback) {
        var maxID = token;
        var allTweets = [];
        client.get('search/tweets', {
            q: 'flu -filter:retweets',
            count: '100',
            lang: 'en',
            //until: '2018-11-11',
            geocode: '54.161342,-1.985778,600km',
            max_id: maxID,
        }, function (error, tweets) {

            var write = false;

            // return obj
            var data = tweets.statuses;

            // place tweets in array
            if (error) throw error;

            for (let i = 0; i < data.length; i++) {
                var text = tweets.statuses[i].text;
                var exclURL = text.replace(/(?:https?|ftp):\/\/[\n\S]+/g,'');
                var exclUser = exclURL.replace(/@\S+/g,'');
                var addSpace = exclUser.replace(/(\n)+/g,' ');

                var tweet = {
                    text: addSpace,
                    location: tweets.statuses[i].user.location,
                };
                allTweets.push(tweet);
            }

            var next_results_url_params = tweets.search_metadata.next_results;

            //if (next_results_url_params == null) {};

            var next_max_id = next_results_url_params.split('max_id=')[1].split('&')[0];

            //write tweets to csv file
            if(write) {
                var fs = require('fs');

                var file = fs.createWriteStream('data/tweets.csv', {'flags': 'a', 'encoding': 'utf8'});
                file.on('error', function (err) { /* error handling */
                });
                for (let i = 0; i < allTweets.length; i++) {
                    file.write('"' + allTweets[i].text + '"' + ',' + '"' + allTweets[i].location + '"' + '\n');
                }
                file.end();
            }
            callback(allTweets);

            //enter token for pagination using recursion
            //retrieveTweetsBatch(maxID,callback);

            // replace next token with new maxID
            maxID = next_max_id;
        });
    }

exports.retrieveTweetsBatch = retrieveTweetsBatch;
