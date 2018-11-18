/**
 * Not written by group, origin code : Google cloud storage  -->  https://cloud.google.com/storage/docs/how-to
 */

// environment variables (see .env)
require('dotenv').config();
require('http');

//twitter = require('./twitterSearchGet');

// var data = twitter.receiveTweets();
// //console.log(fludata);
// var fs  = require("fs");
// var path = 'data/tweets.txt';
// var tweets = fs.readFileSync(path).toString().split('\n');

// Imports the Google Cloud client library.
const {Storage} = require('@google-cloud/storage');

// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
const storage = new Storage({
    projectId: 'sacred-portal-221219',
    keyFilename: '../authentication/My First Project-f301f874651b.json'
});

// Makes an authenticated API request.
storage
    .getBuckets()
    .then((results) => {
        const buckets = results[0];
        //buckets.push(tweets);

        console.log('Buckets:');
        buckets.forEach((bucket) => {
            console.log(bucket.name);
        });
    })
    .catch((err) => {
        console.error('ERROR:', err);
    });