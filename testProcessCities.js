// var flucases = require('./analysisAutoML');

// flucases.prediction(function (tweets) {
//     console.log(tweets);
// })

var fs = require("fs");
var text = fs.readFileSync("data/CitiesUK.txt").toString('utf-8');
var textByLine = text.split("\n");

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

var array = [];
array.push(tweet1);
array.push(tweet2);
array.push(tweet3);
array.push(tweet4);

for(let i = 0; i < textByLine.length; i++) {
    textByLine[i] = textByLine[i].replace('\r','').toLowerCase()
}
//console.log(array.find(a => a.includes("London")));

for(let i = 0;i < array.length; i ++){
    for(let j = 0;j < textByLine.length; j++)
    {
        array[i].location
    }
}


S.includes("web");

console.log(textByLine.indexOf('aberdeen,England') > -1);