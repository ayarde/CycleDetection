var express = require("express");

var app = express();

var apiurl = express.Router();

var allowMethods = function(req, res, next){
  res.header("Access-Control-Allows-Methods", "GET, POST, PUT, DELETE");
}

app.get('/cycleDetection/:path(*\*)',function(req, res, next){
  res.send(req.param('path'));
});

app.listen(8080, function(){
  console.log("Sever listens in 8080 port");
});
