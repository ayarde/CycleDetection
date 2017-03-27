var express = require("express");

var app = express();

var _ = require('underscore');

var fx0= [];

var lam = 0;
var mu = 0;

var allowMethods = function(req, res, next){
  res.header("Access-Control-Allows-Methods", "GET, POST, PUT, DELETE");
}

function f(p){
  return fx0[p];
}

function brentAlgorithm(x0){

  var power = lam = 1;
  var tortoise = x0;
  var hare = f(x0);

  while (tortoise != hare){
    if(power == lam){
      tortoise = hare;
      power *= 2;
      lam = 0;
    }
    hare = f(hare);
    lam++;
  }

  mu = 0;
  tortoise = hare = x0;
  _.range(lam).forEach(elem => {
    hare = f(hare);
  });

  while (tortoise != hare) {
    tortoise = f(tortoise);
    hare = f(hare);
    mu++;
  }
  console.log("Lam: "+lam);
  console.log("Mu: "+mu);
  return [lam,mu];
}

function getSecuencies (filePath){
  //'resources/files/secuencies/secuencies.txt'
  var secuencies = [];
  var fs = require('fs');
  var file = "";
  var fileSecuencies = "";
  if (fs.existsSync(filePath)) {
    var file = fs.readFileSync(filePath, "utf8");
    console.log("This is secuencies.txt \n"+file);
    fileSecuencies = file.toString().split('\n');
  }

  return fileSecuencies;
}

function  getCycleToSecuency(filePath){
  var fileSecuencies = [];
  var cycles = [];
  var temp = [];
  fileSecuencies = getSecuencies(filePath);
  for (var i = 0; i < fileSecuencies.length-1; i++) {
    console.log('Secuencies'+ fileSecuencies[i]);
    temp = fileSecuencies[i].split(' ').map(Number);
    fx0 = temp;
    cycles [i] = brentAlgorithm(temp[0]);
  }
  return cycles;
}

app.get('/cycleDetection/:path(*\*)',function(req, res, next){
  filePath = req.param('path');
  result = getCycleToSecuency(filePath);

  if (result.length == 0) {
    res.send("File not found");
  } else {
    res.send(result);
  }

});

app.listen(8080, function(){
  console.log("Sever listens in 8080 port");
});
