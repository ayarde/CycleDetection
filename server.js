var express = require("express");
var app = express();

var lam = 0;
var mu = 0;

var allowMethods = function(req, res, next){
  res.header("Access-Control-Allows-Methods", "GET, POST, PUT, DELETE");
}

function floydAlgorithm(secuencies,x0) {
  var i = 0;
  var j = 0;
  var mu = 0;
  var lam = 1;

  var tortoise = secuencies[i];
  var hare = secuencies[x0];

  while (tortoise != hare) {
    if (i < secuencies.length){
      i += 1;
    }

    if(j < secuencies.length && ((secuencies.length-j)>2)) {
      j += 2;
    }

    tortoise = secuencies[i];
    hare = secuencies [j];
  }

  i = 0;
  tortoise = secuencies[i];

  while (tortoise != hare) {
    if (i < secuencies.length){
      i += 1;
    }

    if(j < secuencies.length - 1) {
      j += 1;
    }

    tortoise = secuencies[i];
    hare = secuencies[j];
    mu += 1;
  }

  j=i+1
  hare = secuencies[j];
  while (tortoise != hare) {
    if (j < secuencies.length) {
      j += 1;
    }
      hare = secuencies[j];
      lam += 1;
  }
  return buildCycle(secuencies,lam,mu);
}

function buildCycle(secuencies,lam,mu){
  var cycle ='';
  var cycleLength = mu + lam;
  if(lam < mu){
    cycle = cycle + secuencies[mu].toString();
  }else{
    for (var i=mu; i < cycleLength; i++){
      if(cycle.length == 1){
        cycle = cycle + secuencies[i].toString();
      } else {
        cycle = cycle + ' ' + secuencies[i].toString();
      }
    }
  }
  return cycle;
}

function getSecuenciesFromFile (filePath){
  //'resources/files/secuencies/secuencies.txt'
  var secuencies = [];
  var fs = require('fs');
  var file = "";
  var fileSecuencies = "";
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    var file = fs.readFileSync(filePath, "utf8");
    fileSecuencies = file.toString().split('\n');
  }

  return fileSecuencies;
}

function  getCycleToSecuency(filePath){
  var fileSecuencies = [];
  var cycles = [];

  fileSecuencies = getSecuenciesFromFile(filePath);
  for (var i = 0; i < fileSecuencies.length-1; i++) {
    temp = fileSecuencies[i].split(' ').map(Number);
    cycles [i] = floydAlgorithm(temp,temp[0]);
  }
  var text = ''
  for (let i = 0; i < cycles.length; i++) {
    text +=  cycles[i] + '<br>';
  }
  return text;
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
