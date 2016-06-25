//Problem: We need a simple way to look at a user's badge count and JavaScript points
//Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var https = require('https');
var http = require('http');

// print out message
function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badges and " + points + " in JavaScript";
  console.log(message);
}

// Print out error message
function printError(error) {
  console.log(error.message);
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json)
  var request = https.get('https://teamtreehouse.com/' + username + '.json', function(response) {
    var body = '';
    //Read the data
    response.on('data', function(chunk){
      body += chunk;
    });
    response.on('end', function(){
      if(response.statusCode === 200) {
        try {
          //Parse the data
          var profile = JSON.parse(body);
          //Print the data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse error
          printError(error);
        }
      } else {
        // Status code error
        printError({message: "There was an error getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"});
      }
    });
  });
  // Conection error
  request.on('error', printError);
}

module.exports.get = get;