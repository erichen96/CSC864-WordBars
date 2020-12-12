var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

tfidf.addDocument(tfidfString);


tfidf.tfidfs(userQuery, function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

function histogram(tfidfString) {
    //Generates histogram from a string of all API calls

    //Lowercasing
    tfidfString = tfidfString.toLowerCase();
    //Noise Removal
    for (j = 0; j < format.length; j++) {
        var oldRegEx = new RegExp(format[i], 'g')
        tfidfString = tfidfString.replace(oldRegEx, ' ')
    }

    var sortable = [];
    for (var tfidf in tfidf.tfidf) {
        sortable.push([tfidf, measure]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    //Generates Labeled Buttons for all words in array and their number of occurances
    for (var x in sortable) {
        document.getElementById("tfidfgramBox").innerHTML += "<button id = " + sortable[x][0] + " onclick = input(\"" + sortable[x][0] + "\")>" + sortable[x][0] + "</button";
        document.getElementById("tfidfgramBox").innerHTML += " " + sortable[x][1] + "<br>";
    }
  }