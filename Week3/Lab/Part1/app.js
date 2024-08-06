const express = require("express");
const path = require("path");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important

const PORT_NUMBER = 8080;

let app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));
app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});

app.get('/', function (req, res) {
    fileName = VIEWS_PATH + "index.html";
    res.sendFile(fileName);
  });


  app.get('/add/:no1/:no2', function (req, res) {// parameter
    fileName = VIEWS_PATH + "index.html";
    let number1 = parseInt(req.params.no1);
    let number2 = parseInt(req.params.no2);
    let result = number1 + number2; 
    res.send(String(result));//does not accept number
  });

  app.get('/sub', function (req, res) {// query string
    let number1 = parseInt(req.query.no1);
    let number2 = parseInt(req.query.no2);
    let result = number1 - number2;
    res.send(result + "");// a different way to convert to strings
});

app.get('/info', function (req, res) {
    fileName = VIEWS_PATH + "info.html";
    res.sendFile(fileName);
  });