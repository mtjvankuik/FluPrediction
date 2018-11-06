// Dependencies
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto');

// Initialize
const oauth = OAuth({
    consumer: {
        key: 'IJxLCQzh8FlLIwJ8TcUyDcWNH',
        secret: 'LvD40YXAU9r5X3nLbLbSwWaegWbocQ9HSJaiUJgX75IUMuftgG'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

const request_data = {
    url: 'https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json',
    method: 'POST',
    data: {query: 'griep'}
};

// Note: The token is optional for some requests
const token = {
    key: '2811618521-r9sEMCbmMeS3xxj7bTytFSsWLG7PZFjD74S8eKK',
    secret: 'fi6O2wVYjHV5wm8O4gBCwAEIvtHhn7Wq8NR2uhQiCdxKc'
};

request({
    url: request_data.url,
    method: request_data.method,
    form: oauth.authorize(request_data, token)
}, function(error, response, body) {
    // Process your data here
    console.log(request_data.url)
    if (error) throw error;
    console.log(body);

});