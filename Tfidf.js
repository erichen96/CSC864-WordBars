var entireString;
var maxCalls = 2;
var currentNumberOfCalls = 0;
var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

var TfidfString = entireString.split(" ");
function hndlr(response) {

  // for (var i = 0; i < response.items.length; i++) {

  // iterator is 10 due to the 10 json api limit per request

  for (var i = 0; i < 10; i++) {

      var item = response.items[i];
      // in production code, item.htmlTitle should have the HTML entities escaped.
      // console.log(item); // Note json object is found in console

      // Prints title,snippet,link to the html
      document.getElementById("contentBox").innerHTML += "<br>" + item.htmlTitle;
      document.getElementById("contentBox").innerHTML += "<br>" + item.snippet;
      document.getElementById("contentBox").innerHTML += "<br>" + item.link.replace(/(http:\/\/[^\s]+|https:\/\/[^\s]+)/g, "<a href='$1'>$1</a>");
      document.getElementById("contentBox").innerHTML += "<hr>";


      entireString = entireString + item.htmlTitle + item.snippet;
      ////////////////////////////////////////////////////////////////////////////////////////////////////
      //Comments below is an example of the text processing using only 1 API call
      //
      //

      // string = item.htmlTitle + item.snippet;
      // // console.log(string);

      // //Lowercasing
      // //Lowercasing is one of the simplest and most effective form of text preprocessing.
      // //Lowercasing solves the sparsity issue, where the same words with different cases
      // //map to the same lowercase form.
      // string = string.toLowerCase();
      // // console.log("Lower Case")
      // // console.log(string);

      // //Noise Removal
      // //ie. ..., <, >, etc
      // for (j = 0; j < format.length; j++) {
      //     var oldRegEx = new RegExp(format[i], 'g')
      //     string = string.replace(oldRegEx, '')

      // }
      // // console.log("Noise Removal")
      // // console.log(string);

      // // https://requirejs.org/docs/download.html

      // // var stemmer = require('stemmer')
      // // //Stemming
      // // //Process of reducing inflection in words to their root form.
      // // //Porter stemming algorithm
      // // var toSplit = string;
      // // var toStem = toSplit.split(" ");
      // // console.log(toStem);
      // // for(s = 0; s < toStem.length; s++){
      // //     toStem[i] = stemmer(toStem[i]);
      // // }

      // // console.log(toStem);
      // // string = toStem.join(" ");
      // // console.log(string);


      // //Stopword Removal
      // //Stop words are a set of commonly used words in a language.
      // //Removal of these allows for more effective search and topic extraction systems

      // for (k = 0; k < stop_words.length; k++) {
      //     var oldRegEx = new RegExp("\\b" + stop_words[k] + "\\b", 'g')
      //     string = string.replace(oldRegEx, '')

      // }
      // // console.log("StopWord Removal")
      // // console.log(string);



      // var pattern = /\w+/g,
      //     // /\w+ matches any alphanumeric character from basic Latin alphabet including underscore.
      //     // Equivalent to [A-Za-z0-9]. 
      // matchedWords = string.match(pattern);
      // console.log(matchedWords);

      // var counts = matchedWords.reduce(function (stats, word) {

      //     /* `stats` is the object that we'll be building up over time.
      //        `word` is each individual entry in the `matchedWords` array */
      //     if (stats.hasOwnProperty(word)) {
      //         /* `stats` already has an entry for the current `word`.
      //            As a result, let's increment the count for that `word`. */
      //         stats[word] = stats[word] + 1;
      //     } else {
      //         /* `stats` does not yet have an entry for the current `word`.
      //            As a result, let's add a new entry, and set count to 1. */
      //         stats[word] = 1;
      //     }

      //     /* Because we are building up `stats` over numerous iterations,
      //        we need to return it for the next pass to modify it. */
      //     return stats;

      // }, {});

      // console.log(counts);
      /////////////////////////////////////////////////////////////////////////////////////////////////////     
  }

  //Generates Histogram After all API requests are called
  currentNumberOfCalls += 1;
  if (currentNumberOfCalls == maxCalls) {
      histogram(entireString);
      currentNumberOfCalls = 0;
      entireString = "";
  }
};


tfidf.addDocument(entireString);
tfidf.addDocument('this document is about ruby.');
tfidf.addDocument('this document is about ruby and node.');
tfidf.addDocument('this document is about node. it has node examples');

console.log(tfidf.tfidf('node', 0));
console.log(tfidf.tfidf('node', 1));