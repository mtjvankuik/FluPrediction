/**
 * Written by group
 */

var fs = require("fs");
var text = fs.readFileSync("data/CitiesUK.txt").toString('utf-8');

var tweet1 = {
    text: 'test1',
    location: 'Aberdeen,England',
};

var tweet2 = {
    text: 'test2',
    location: 'London UK',
};

var tweet3 = {
    text: 'test3',
    location: 'Walsall, England',
};

var tweet4 = {
    text: 'test4',
    location: 'Aberdeen',
};

var tweets = [];
tweets.push(tweet1);
tweets.push(tweet2);
tweets.push(tweet3);
tweets.push(tweet4);

var textByLine = text.split("\n");
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
    tweets.find(function (item) {
        if (item.location.toLowerCase().includes(cities[i].location)){
            count++;
        }
    })
    cities[i].count = count;
}
console.log(cities);