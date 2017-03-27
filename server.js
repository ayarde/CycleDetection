var express = require("express");

var app = express();

var _ = require('underscore');

var fx0= [];

var lam = 0;
var mu = 0;

var allowMethods = function(req, res, next){
  res.header("Access-Control-Allows-Methods", "GET, POST, PUT, DELETE");
}

function brentAlgorithm(list){
  var tortoise = hare = list[0];
  var step_taken = 0;
  var step_limit = 2;

  for (let i = 0; i < list.length; i++) {
    if(hare = list[list.length - 1]){
      console.log("Not found loop");
    }

    hare = list[i+1];
    step_taken++;

    if(hare == tortoise){
      console.log("Loop found");
      console.log("Hare: " + hare + " Tortoise: " + tortoise);
    }

    if(step_taken == step_limit){
      step_taken = 0;
      step_limit *=2;
      tortoise = hare;
    }
  }
}
function f(p){
  return fx0[p];
}

function algorithmBrent(x0){

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

  return [lam,mu];
}

function getSecuencies (filePath){
  //'resources/files/secuencies/secuencies.txt'
  var secuencies = [];
  var fs = require('fs');
  var file = fs.readFileSync(filePath, "utf8");

  console.log("This is secuencies.txt \n"+file);
  fileSecuencies = file.toString().split('\n');

  return fileSecuencies;
}

function  getCycleToSecuency(filePath){
  var fileSecuencies = [];
  fileSecuencies = getSecuencies(filePath);
  for (var i = 0; i < fileSecuencies.length-1; i++) {
    console.log('Secuencies'+ fileSecuencies[i]);
  }

}

function fx0Function(){
  myArray = [2,0,6,3,1,6,3,1,6,3,1];

  var fx0Values = [];
  for (let i = 0; i < myArray.length; i++) {
    fx0Values[myArray[i]]= myArray[i+1];
  }
  console.log(fx0Values);
}
app.get('/cycleDetection/:path(*\*)',function(req, res, next){
  filePath = req.param('path');
  res.send(filePath);
  getCycleToSecuency(filePath);
  //fx0 = [6,6,0,1,4,3,3,4,2];
  fx0 = [2,0,6,3,1,6,3,1,6,3,1];
  var result = algorithmBrent(2);
  brentAlgorithm(fx0);
  console.log(result);
});

app.listen(8080, function(){
  console.log("Sever listens in 8080 port");
});
