var http = require('http');  
var url = require('url');  
var fs = require('fs');  
var stemmer = require('stemmer')

var server = http.createServer(function(request, response) {  
    var path = url.parse(request.url).pathname;  
    switch (path) {  
        case '/WordBars.html':  
            fs.readFile(__dirname + path, function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    response.write(data);  
                    response.end();  
                }  
            });  
            break;  
        default:  
            response.writeHead(404);  
            response.write("opps this doesn't exist - 404");  
            response.end();  
            break;  
    }  
});  
server.listen(3000);  



// var stemmer = require('stemmer')


// console.log(stemmer("detestable"))
// // https://www.npmjs.com/package/stemmer
// //       var stemmer = require('stemmer')
// //       console.log(stemmer("detestable"))


// var toSplit = "Detestable stemmer removal effective";
// var toStem = toSplit.split(" ");
// console.log(toStem);
// for(s = 0; s < toStem.length; s++){
//     toStem[s] = stemmer(toStem[s]);
// }

// console.log(toStem);
// string = toStem.join(" ");
// console.log(string);