var express = require("express");

var app = express();

var apiurl = express.Router();

var http = require("http");
var url = require("url");

/*apiurl.use(function(req,res,next){
var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
console.log('url',fullUrl);
next();
console.log('Url',fullUrl);

});
app.use('/',apiurl);*/


var allowMethods = function(req, res, next){
  res.header("Access-Control-Allows-Methods", "GET, POST, PUT, DELETE");
}

app.get('/cycleDetection',function(req, res, next){
  //var pathname = url.parse(req.url).pathname;
  //console.log("Request for " + pathname + " received.");
  res.send('Hello World');

});

app.listen(8080, function(){
  console.log("Sever listens in 8080 port");
});
