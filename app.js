var stemmer = require('stemmer')


console.log(stemmer("detestable"))
// https://www.npmjs.com/package/stemmer
//       var stemmer = require('stemmer')
//       console.log(stemmer("detestable"))


var toSplit = "Detestable stemmer removal effective";
var toStem = toSplit.split(" ");
console.log(toStem);
for(s = 0; s < toStem.length; s++){
    toStem[s] = stemmer(toStem[s]);
}

console.log(toStem);
string = toStem.join(" ");
console.log(string);