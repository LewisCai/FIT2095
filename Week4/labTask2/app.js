const express = require("express");
const path = require("path");
const Product = require("./Product");

const print = console.log;
const VIEWS_PATH = path.join(__dirname, "/views/"); //Important

const PORT_NUMBER = 8080;

let app = express();
app.use(express.static("node_modules/bootstrap/dist/css"));

const products = [];

// Middleware to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT_NUMBER, function () {
	print(`listening on port ${PORT_NUMBER}`);
});

app.get('/', function (req, res) {
    fileName = VIEWS_PATH + "index.html";
    res.sendFile(fileName);
  });

//list all products
app.get('/33120102/products', function (req, res) {
  //send array of procucts
  res.send(products);
});

//add profuct to list
app.get('/33120102/products/new', function (req, res) {
  fileName = VIEWS_PATH + "new_product.html";
  res.sendFile(fileName);
});

app.post('/33120102/products/new', function (req, res) {
  const{pName, pCategory, pCost} = req.body;

  console.log(pName, pCategory, pCost);

  let newProduct = new Product(pName, pCategory, pCost);
  products.push(newProduct);

  //redirect to list all products
  res.redirect('/33120102/products');
});

//remove a product with id via GET
app.get('/33120102/products/remove/:id', function (req, res) {
  const id = req.params.id;
  const index = products.findIndex(product => product.id == id);
  products.splice(index, 1);
  res.redirect('/33120102/products');
});
