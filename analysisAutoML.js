// environment variables (see .env)
require('dotenv').config();

const fs = require('fs');

const automl = require('@google-cloud/automl');

// var twitter = require('./twitterSearchGet');
//
// twitter.receiveTweets(function (tweets) {
//     console.log(tweets);
// });

const client = new automl.PredictionServiceClient({
    projectId: 'sacred-portal-221219',
    keyFilename: 'authentication/sacred-portal-221219-6909954c3dda.json'
});

/**
 *
 */
    const projectId = 'sacred-portal-221219';
    const computeRegion = 'us-central1';
    const modelId = 'TCN2178296190980122533';
    const filePath = 'data/tweets_test.csv';

    // Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

// Read the file content for prediction.
const snippet = fs.readFileSync(filePath, 'utf8');

// Set the payload by giving the content and type of the file.
const payload = {
    textSnippet: {
        content: snippet,
        mimeType: `text/plain`,
    },
};

// Params is additional domain-specific parameters.
// Currently there is no additional parameters supported.
client
    .predict({name: modelFullId, payload: payload, params: {}})
    .then(responses => {
        console.log(`Prediction results:`);
        responses[0].payload.forEach(result => {
            console.log(`Predicted class name: ${result.displayName}`);
            console.log(`Predicted class score: ${result.classification.score}`);
        });
    })
    .catch(err => {
        console.error(err);
    });