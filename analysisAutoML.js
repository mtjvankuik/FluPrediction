const automl = require(`@google-cloud/automl`);
const fs = require(`fs`);

// Create client for prediction service.
const client = new automl.v1beta1.PredictionServiceClient();

/**
 * TODO(developer): Uncomment the following line before running the sample.
 */
    const projectId = 'sacred-portal-221219';
    const computeRegion = 'europe-west1';
    const modelId = 'id of the model, e.g. “ICN12345”';
    const filePath = 'tweets.txt"';

    // Get the full path of the model.
const modelFullId = client.modelPath(projectId, computeRegion, modelId);

// Read the file content for prediction.
const snippet = fs.readFileSync(filePath, `utf8`);

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