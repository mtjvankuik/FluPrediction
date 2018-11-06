

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
        return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
    }
});

const request_data = {
    url: 'https://api.twitter.com/1/statuses/update.json?include_entities=true',
    method: 'POST',
    data: { status: 'Hello' }
};

// Note: The token is optional for some requests
const token = {
    key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

$.ajax({
    url: request_data.url,
    type: request_data.method,
    data: oauth.authorize(request_data, token)
}).done(function(data) {
    // Process your data here
});
