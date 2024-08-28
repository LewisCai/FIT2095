const mongodb = require("mongodb");
const express = require("express");
const path = require("path");

const MongoClient = mongodb.MongoClient;
const URL = "mongodb://127.0.0.1:27017";
const client = new MongoClient(URL);

const app = express();
app.listen(8080);
app.use(express.urlencoded({ extended: false }));

let db;
let collection;

async function connectDB() {
	await client.connect();
	db = client.db("fit2095");
	collection = db.collection("week6");

	console.log("Connect to DB successfully");
}

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/33120102/sales", function (req, res) {
    db.collection("sales")
    .find({})
    .toArray(function (err, data) {
      res.render("listsales", { sales: data });
    });
});

app.get("/33120102/sales/unpaid", function (req, res) {
    db.collection("sales")
    .find({status: "unpaid"})
    .toArray(function (err, data) {
      res.render("listsales", { sales: data });
    });
});

app.get("/33120102/sales/add", function (req, res) {
    //send the add sale form also send the current number of sales in db
    res.sendFile(path.join(__dirname, "views", "add_sale.html"));
});

app.post("/33120102/sales/add", function (req, res) {
    let sale = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        isPaid: req.body.isPaid === "true",
    };
    db.collection("sales").insertOne(sale);
    res.redirect("/33120102/sales");
});

app.get("/33120102/sales/remove", function (req, res) {
    //delete entire sales document
    db.collection("sales").deleteMany({});
    res.redirect("/33120102/sales");
});

connectDB();
