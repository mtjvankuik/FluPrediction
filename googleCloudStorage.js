// environment variables (see .env)
require('dotenv').config();
require('http');

twitter = require('./twitterSearchGet');

var fludata = twitter.receiveTweets();

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
        buckets

        console.log('Buckets:');
        buckets.forEach((bucket) => {
            console.log(bucket.name);
        });
    })
    .catch((err) => {
        console.error('ERROR:', err);
    });