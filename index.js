// index.js 
var express = require('express');
var app = express();

// We Tell to the Express app that your static files will live in the public folder.
app.use(express.static('public'));


var lodash = require('lodash');
 
var output = lodash.without([1, 2, 3], 2);
console.log(output)




// index.js
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// app.get('/', function (req, res) {
//   console.log(req.query)
//   res.render('home')
// })


app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
})

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})


// REQUIRE HTTP MODULE
//var http = require('http');

// app.get('/', function (req, res) {
//   console.log(req.query.term)
//   var queryString = "funny cat";
//   // ENCODE THE QUERY STRING TO REMOVE WHITE SPACES AND RESTRICTED CHARACTERS
//   var term = encodeURIComponent(queryString);
//   // PUT THE SEARCH TERM INTO THE GIPHY API SEARCH URL
//   var url = 'http://api.giphy.com/v1/gifs/search?q=' + term + '&api_key=dc6zaTOxFJmzC'

//   http.get(url, function(response) {
//     // SET ENCODING OF RESPONSE TO UTF8
//     response.setEncoding('utf8');

//     var body = '';

//     response.on('data', function(d) {
//       // CONTINUOUSLY UPDATE STREAM WITH DATA FROM GIPHY
//       body += d;
//     });

//     response.on('end', function() {
//       // WHEN DATA IS FULLY RECEIVED PARSE INTO JSON
//       var parsed = JSON.parse(body);
//       console.log(parsed)
//       // RENDER THE HOME TEMPLATE AND PASS THE GIF DATA IN TO THE TEMPLATE
//       res.render('home', {gifs: parsed.data})
//     });
//   });
// })


// INITIALIZE THE GIPHY-API LIBRARY
var giphy = require('giphy-api')();

app.get('/', function (req, res) {
  giphy.search(req.query.term, function (err, response) {
    //console.log(response.data)
    res.render('home', {gifs: response.data})
  });
});




















var FBBotFramework = require('fb-bot-framework');
 
// Initialize 
var bot = new FBBotFramework({
    page_token: "THIS_IS_PAGE_TOKEN",
    verify_token: "THIS_IS_VERIFY_TOKEN"
});
 
// Setup Express middleware for /webhook 
app.use('/webhook', bot.middleware());
 
// Setup listener for incoming messages 
bot.on('message', function(userId, message){
    // bot.sendTextMessage(userId, "Echo Message:" + message); 
    
    // Send quick replies 
    var replies = [
        {
            "content_type": "text",
            "title": "Good",
            "payload": "thumbs_up"
        },
        {
            "content_type": "text",
            "title": "Bad",
            "payload": "thumbs_down"
        }
    ];
    bot.sendQuickReplies(userId, message, replies);
});
 
// Setup listener for quick reply messages 
bot.on('quickreply', function(userId, payload){
    bot.sendTextMessage(userId, "payload:" + payload);
});
 
// Config the Get Started Button and register a callback 
bot.setGetStartedButton("GET_STARTED");
bot.on('postback', function(userId, payload){
 
    if (payload == "GET_STARTED") {
        getStarted(userId);
    }
    
    // Other postback callbacks here 
    // ... 
    
});
 
function getStarted(userId){
    
    // Get started process  
}
 
// Setup listener for attachment 
bot.on('attachment', function(userId, attachment){
    
    // Echo the audio attachment 
    if (attachment[0].type == "audio") {
        bot.sendAudioAttachment(userId, attachment[0].payload.url);
    }
    
});
 
// Make Express listening 
app.listen(3000);