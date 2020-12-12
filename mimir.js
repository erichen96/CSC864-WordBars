var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

tfidf.addDocument(String);


console.log('node --------------------------------');
tfidf.tfidfs('test', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});

console.log('ruby --------------------------------');
tfidf.tfidfs('ruby', function(i, measure) {
    console.log('document #' + i + ' is ' + measure);
});