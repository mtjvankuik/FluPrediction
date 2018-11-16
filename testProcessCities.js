var fs = require("fs");

var text = fs.readFileSync("data/CitiesUK.txt").toString('utf-8');
var textByLine = text.split("\n");

for(let i = 0; i < textByLine.length; i++) {
    textByLine[i] = textByLine[i].replace('\r','').toLowerCase()

}
console.log(textByLine);

console.log(textByLine.indexOf('aberdeen,England') > -1);