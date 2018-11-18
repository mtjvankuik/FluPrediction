// Imports the Google Cloud client library.
const language = require('@google-cloud/language');
/**
 * Not written by group, origin code : Google cloud storage  -->  https://cloud.google.com/storage/docs/how-to
 */

// Creates a client.
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following lines to run this code
 */
 const bucketName = 'Your bucket name, e.g. my-bucket';
 const fileName = 'tweets.txt';

// Prepares a document, representing a text file in Cloud Storage
const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT',
};

// Classifies text in the document
client
    .classifyText({document: document})
    .then(results => {
        const classification = results[0];

        console.log('Categories:');
        classification.categories.forEach(category => {
            console.log(
                `Name: ${category.name}, Confidence: ${category.confidence}`
            );
        });
    })
    .catch(err => {
        console.error('ERROR:', err);
    });