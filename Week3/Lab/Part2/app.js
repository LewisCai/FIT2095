const express = require("express");
const path = require("path");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important

const PORT_NUMBER = 8080;

let app = express();
app.listen(PORT_NUMBER, function () {
  print(`listening on port ${PORT_NUMBER}`);
})


