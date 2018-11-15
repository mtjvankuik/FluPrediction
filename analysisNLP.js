// environment variables (see .env)
require('dotenv').config();

// Imports the Google Cloud client library
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

/**
 * TODO(developer): Uncomment the following line to run this code.
 */
//FLU EXAMPLE (+) classfied as Categories:
// Name: /Health/Health Conditions/Infectious Diseases, Confidence: 0.9200000166893005
const text = 'Kim Donghyuk: I had difficulty because of flu. I wanted to ' +
    'show a clean performance and I feel sorry for not being able to show a ' +
    'perfect stage. This is my first time to monitor a program for 10 times. ' +
    'I am nervous and excited thinking about how people would rate/evaluate me';

//FLU EXAMPLE (-) classified as Categories:
// Name: /Sensitive Subjects, Confidence: 0.7099999785423279
const text2 = 'Today marks the 100 year anniversary of the end of World War I. ' +
    '10 million soldiers and 7 million civilians died in that war. But even more ' +
    'devastating was the Spanish flu that spread throughout the world by the returning ' +
    'soldiers. It killed 50 million people.';

const text3 = 'All I want is McDonalds and a Milkshake but rn I cant even keep down a glass of gingerale... stomach flu sucks';

var fs  = require("fs");
var path = 'data/tweets.txt';
var tweets = fs.readFileSync(path).toString().split('\n');
console.log(tweets);
//Prepares a document, representing the provided text
const document = {
    content: text,
    type: 'PLAIN_TEXT',
};
