var entireString;
var maxCalls = 2;
var currentNumberOfCalls = 0;

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
        tfidfString = item.htmlTitle + item.snippet;
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

function histogram(entireString) {
    //Generates histogram from a string of all API calls

    //Lowercasing
    entireString = entireString.toLowerCase();
    //Noise Removal
    for (j = 0; j < format.length; j++) {
        var oldRegEx = new RegExp(format[i], 'g')
        entireString = entireString.replace(oldRegEx, ' ')
    }

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


    //Stopword Removal
    //Stop words are a set of commonly used words in a language.
    //Removal of these allows for more effective search and topic extraction systems
    for (k = 0; k < stop_words.length; k++) {
        var oldRegEx = new RegExp("\\b" + stop_words[k] + "\\b", 'g')
        entireString = entireString.replace(oldRegEx, '')
    }
    var pattern = /\w+/g,
        // /\w+ matches any alphanumeric character from basic Latin alphabet including underscore.
        // Equivalent to [A-Za-z0-9].
        entireMatchedWords = entireString.match(pattern);
    // console.log("Total Matched Words")
    // console.log(entireMatchedWords);


    var counts = entireMatchedWords.reduce(function (stats, word) {

        /* `stats` is the object that we'll be building up over time.
          `word` is each individual entry in the `matchedWords` array */
        if (stats.hasOwnProperty(word)) {
            /* `stats` already has an entry for the current `word`.
           As a result, let's increment the count for that `word`. */
            stats[word] = stats[word] + 1;
        } else {
            /* `stats` does not yet have an entry for the current `word`.
            As a result, let's add a new entry, and set count to 1. */
            stats[word] = 1;
        }
        /* Because we are building up `stats` over numerous iterations,
         we need to return it for the next pass to modify it. */
        return stats;
    }, {});

    // console.log(counts);

    //Histogram  
    //Sort alphabetically
    // const counts2 = {};
    // Object.keys(counts).sort().forEach(function(key) {
    //     counts2[key] = counts[key];
    // });

    // for(var x in counts2){
    //     document.getElementById("histogramBox").innerHTML += x + " " + counts2[x] + "<br>";
    // }

    //Histogram
    //Sort by value
    var sortable = [];
    for (var text in counts) {
        sortable.push([text, counts[text]]);
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });

    //Generates Labeled Buttons for all words in array and their number of occurances
    for (var x in sortable) {
        document.getElementById("histogramBox").innerHTML += "<button id = " + sortable[x][0] + " onclick = input(\"" + sortable[x][0] + "\")>" + sortable[x][0] + "</button";
        document.getElementById("histogramBox").innerHTML += " " + sortable[x][1] + "<br>";
    }

}

//Used to append text from buttons to create new user 
function input(text) {
    document.getElementById('formValueId').value += " " + text;
}


var format = new Array(
    "<[^>]*>",
    "<",
    ">",
    '/\//',
    '/',
    ':',
    '/\|',
    ','
)

var natural = require('natural');
var TfIdf = natural.TfIdf;
var tfidf = new TfIdf();

tfidf.addDocument(tfidfString);


tfidf.tfidfs('node ruby', function(i, measure) {
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

//This list of stop words taken from 
//http://geeklad.com/remove-stop-words-in-javascript
var stop_words = new Array(
    '[0-9]{1}',
    '[0-9]{2}',
    '[0-9]{3}',
    'a',
    'about',
    'above',
    'across',
    'after',
    'again',
    'against',
    'all',
    'almost',
    'alone',
    'along',
    'already',
    'also',
    'although',
    'always',
    'among',
    'an',
    'and',
    'another',
    'any',
    'anybody',
    'anyone',
    'anything',
    'anywhere',
    'are',
    'area',
    'areas',
    'around',
    'as',
    'ask',
    'asked',
    'asking',
    'asks',
    'at',
    'away',
    'b',
    'back',
    'backed',
    'backing',
    'backs',
    'be',
    'became',
    'because',
    'become',
    'becomes',
    'been',
    'before',
    'began',
    'behind',
    'being',
    'beings',
    'best',
    'better',
    'between',
    'big',
    'both',
    'but',
    'by',
    'c',
    'came',
    'can',
    'cannot',
    'case',
    'cases',
    'certain',
    'certainly',
    'clear',
    'clearly',
    'come',
    'could',
    'd',
    'did',
    'differ',
    'different',
    'differently',
    'do',
    'does',
    'done',
    'down',
    'down',
    'downed',
    'downing',
    'downs',
    'during',
    'e',
    'each',
    'early',
    'either',
    'end',
    'ended',
    'ending',
    'ends',
    'enough',
    'even',
    'evenly',
    'ever',
    'every',
    'everybody',
    'everyone',
    'everything',
    'everywhere',
    'f',
    'face',
    'faces',
    'fact',
    'facts',
    'far',
    'felt',
    'few',
    'find',
    'finds',
    'first',
    'for',
    'four',
    'from',
    'full',
    'fully',
    'further',
    'furthered',
    'furthering',
    'furthers',
    'g',
    'gave',
    'general',
    'generally',
    'get',
    'gets',
    'give',
    'given',
    'gives',
    'go',
    'going',
    'good',
    'goods',
    'got',
    'great',
    'greater',
    'greatest',
    'group',
    'grouped',
    'grouping',
    'groups',
    'h',
    'had',
    'has',
    'have',
    'having',
    'he',
    'her',
    'here',
    'herself',
    'high',
    'high',
    'high',
    'higher',
    'highest',
    'him',
    'himself',
    'his',
    'how',
    'however',
    'i',
    'if',
    'important',
    'in',
    'interest',
    'interested',
    'interesting',
    'interests',
    'into',
    'is',
    'it',
    'its',
    'itself',
    'j',
    'just',
    'k',
    'keep',
    'keeps',
    'kind',
    'knew',
    'know',
    'known',
    'knows',
    'l',
    'large',
    'largely',
    'last',
    'later',
    'latest',
    'least',
    'less',
    'let',
    'lets',
    'like',
    'likely',
    'long',
    'longer',
    'longest',
    'm',
    'made',
    'make',
    'making',
    'man',
    'many',
    'may',
    'me',
    'member',
    'members',
    'men',
    'might',
    'more',
    'most',
    'mostly',
    'mr',
    'mrs',
    'much',
    'must',
    'my',
    'myself',
    'n',
    'necessary',
    'need',
    'needed',
    'needing',
    'needs',
    'never',
    'new',
    'new',
    'newer',
    'newest',
    'next',
    'no',
    'nobody',
    'non',
    'noone',
    'not',
    'nothing',
    'now',
    'nowhere',
    'number',
    'numbers',
    'o',
    'of',
    'off',
    'often',
    'old',
    'older',
    'oldest',
    'on',
    'once',
    'one',
    'only',
    'open',
    'opened',
    'opening',
    'opens',
    'or',
    'order',
    'ordered',
    'ordering',
    'orders',
    'other',
    'others',
    'our',
    'out',
    'over',
    'p',
    'part',
    'parted',
    'parting',
    'parts',
    'per',
    'perhaps',
    'place',
    'places',
    'point',
    'pointed',
    'pointing',
    'points',
    'possible',
    'present',
    'presented',
    'presenting',
    'presents',
    'problem',
    'problems',
    'put',
    'puts',
    'q',
    'quite',
    'r',
    'rather',
    'really',
    'right',
    'right',
    'room',
    'rooms',
    's',
    'said',
    'same',
    'saw',
    'say',
    'says',
    'second',
    'seconds',
    'see',
    'seem',
    'seemed',
    'seeming',
    'seems',
    'sees',
    'several',
    'shall',
    'she',
    'should',
    'show',
    'showed',
    'showing',
    'shows',
    'side',
    'sides',
    'since',
    'small',
    'smaller',
    'smallest',
    'so',
    'some',
    'somebody',
    'someone',
    'something',
    'somewhere',
    'state',
    'states',
    'still',
    'still',
    'such',
    'sure',
    't',
    'take',
    'taken',
    'than',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'therefore',
    'these',
    'they',
    'thing',
    'things',
    'think',
    'thinks',
    'this',
    'those',
    'though',
    'thought',
    'thoughts',
    'three',
    'through',
    'thus',
    'to',
    'today',
    'together',
    'too',
    'took',
    'toward',
    'turn',
    'turned',
    'turning',
    'turns',
    'two',
    'u',
    'under',
    'until',
    'up',
    'upon',
    'us',
    'use',
    'used',
    'uses',
    'v',
    'very',
    'w',
    'want',
    'wanted',
    'wanting',
    'wants',
    'was',
    'way',
    'ways',
    'we',
    'well',
    'wells',
    'went',
    'were',
    'what',
    'when',
    'where',
    'whether',
    'which',
    'while',
    'who',
    'whole',
    'whose',
    'why',
    'will',
    'with',
    'within',
    'without',
    'work',
    'worked',
    'working',
    'works',
    'would',
    'x',
    'y',
    'year',
    'years',
    'yet',
    'you',
    'young',
    'younger',
    'youngest',
    'your',
    'yours',
    'z'
)
