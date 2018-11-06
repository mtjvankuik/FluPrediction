// environment variables (see .env)
require('dotenv').config();

// Dependencies
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');

// Initialize
const oauth = OAuth({
    consumer: {
        key: process.env.TWITTER_CONSUMER_KEY,
        secret: process.env.TWITTER_CONSUMER_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});
const request_data = {
    url: 'https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json',
    method: 'GET',
    data: { q: "griep"}
};

// Note: The token is optional for some requests
const token = {
    key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
}, function(error, response, body) {
    // Process your data here
    console.log(request_data.url)
    console.log(error);
    console.log(response);
    if (error) throw error;
    console.log(body);
    console.log(request_data.url);
});