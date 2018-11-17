// environment variables (see .env)
require('dotenv').config();

const fs = require('fs');

const automl = require('@google-cloud/automl');

const twitter = require('./twitterSearchGet');


const client = new automl.PredictionServiceClient({
    projectId: 'sacred-portal-221219',
    keyFilename: 'authentication/sacred-portal-221219-6909954c3dda.json'
});

/**
 *  Connection and authorization Google
 *  Prediction on new tweets
 *  @Return Array of tweets classified by model as flu.
 */
const projectId = 'sacred-portal-221219';
const computeRegion = 'us-central1';
const modelId = 'TCN2178296190980122533';
//const filePath = 'data/tweets_test_2.csv';

// Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

twitter.retrieveTweetsBatch(null,function(tweets) {

// Read the file content for prediction.

    //console.log(tweets);
    function prediction(callback) {
        //console.log(tweets)
        tweets.forEach(function (tweet,i) {

// Set the payload by giving the content and type of the file.
            const payload = {
                textSnippet: {
                    content: tweet.text,
                    mimeType: `text/plain`,
                },
            };


// Params is additional domain-specific parameters.
// Currently there is no additional parameters supported.
            client
                .predict({name: modelFullId, payload: payload, params: {}})
                .then(responses => {
                    //console.log(`Prediction results:`);
                    responses[0].payload.forEach(result => {
                        var num = 0.9;
                        var labelr = "noflu";
                        var score = result.classification.score;
                        var label = result.displayName;

                        if (score > num) {
                            if (label === labelr) {
                                tweets.splice(tweets.indexOf(tweet),1);
                                if ((tweets.length - 1) === i){

                                    //getTweets(tweets);
                                    callback(tweets);
                                    //console.log(tweets);
                                    //console.log(tweets);
                                }

                            }
                        }

                        //console.log(`Predicted class name: ${result.displayName}`);
                        //console.log(`Predicted class score: ${result.classification.score}`);
                    });

                })
                .catch(err => {
                    console.error(err);
                });

        })
        //console.log(tweets);

    }

    function countFlu(){
        prediction(function (preds) {
            //var map = require('maps');
            //callback(preds);
            //console.log(preds);
            //console.log(preds);
            var fs = require("fs");
            var text = fs.readFileSync("data/CitiesUK.txt").toString('utf-8');
            var textByLine = text.split("\n");
            //var tweets = preds;
            //console.log(tweets);
            var cities = [];

            //format text
            for(let i = 0; i < textByLine.length; i++) {
                textByLine[i] = textByLine[i].replace('\r','').toLowerCase();
                var tweet = {
                    location: textByLine[i],
                    count: 0
                }
                cities.push(tweet)
            }

            for (var i = 0; i < cities.length; i++) {
                var count = 0;
                preds.find(function (item) {
                    if (item.location.toLowerCase().includes(cities[i].location)){
                        count++;
                    }
                })
                cities[i].count = count;
            }
            console.log(cities);
            //map.makeMap(cities);
            //console.log(cities);
        })
    }
    countFlu();

    exports.prediction = prediction;
    exports.countFlu = countFlu;
});

