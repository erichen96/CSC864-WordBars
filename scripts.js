
//Allow text box to be submitted with ENTER button
document.getElementById("formValueId")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("searchButton").click();
        }
    });


function mySearchFunction() {
    //Clears current innerHTML in "contentBox/histogram" for new search query
    document.getElementById("contentBox").innerHTML = "";
    document.getElementById("histogramBox").innerHTML = "";

    //Takes userQuery and stores into variable for API call
    userQuery = document.getElementById('formValueId').value;

    // <!-- Custom Search JSON API  -->
    // <!-- Note to self, api key, cx for specific search engine, and query q for results -->
    // <!-- Each call can only return 10 results, so additional calls require it to start at a different index ie. 11 to get results 11-20 -->
    // <!-- Theses are JSONP, a method for sending JSON data without worrying about cross-domain issues -->

    //var j is used to increment the parameter [start] for the API call each time its called to obtain the next set of json information
    var j = 1;

    //iterater = 2, capped at 2 for testing purposes, change to 10 for final submission
    for (i = 0; i < 2; i++) {
        var s = document.createElement("script");
        //API Key AIzaSyBwVNMl6vi4jJ0qKEQAJWeXImSUGqlyqsU
        //CX KEY c4bb168513ae765b0
        //Backup Keys
        //CX f6511e1b65e5287e0
        //API AIzaSyB_lf1dzU_MWtSLNUCVh5C3TYhhD4WFUYg
        //API AIzaSyDR8jarc2mlEqZSyxZSOO_dFgmuvxIM2dQ

        s.src = "https://www.googleapis.com/customsearch/v1?key=AIzaSyDR8jarc2mlEqZSyxZSOO_dFgmuvxIM2dQ&cx=c4bb168513ae765b0&q=" + userQuery + "&callback=hndlr&start=" + j + "&num=10";
        document.body.appendChild(s);
        j += 10;
    }
}