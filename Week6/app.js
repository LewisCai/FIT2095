const mongodb = require("mongodb");
let ejs = require("ejs");
const express = require("express");
const path = require("path");

const MongoClient = mongodb.MongoClient;
const URL = "mongodb://localhost:27017/";
const client = new MongoClient(URL);

const app = express();
app.listen(8080);
app.use(express.urlencoded({ extended: false }));

// Configure Express for EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

let db;
let collection;

async function connectDB() {
    await client.connect();
    db = client.db("fit2095");
    collection = db.collection("sales");
    console.log("Connect to DB successfully");
}

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/33120102/sales", function (req, res) {
    db.collection("sales")
        .find({})
        .toArray(function (err, data) {
            //if data is not found, redirect to invalid page
            if (data.length === 0) {
                res.sendFile(path.join(__dirname, "views", "noSales.html"));
            }else{
                res.render("listsales", { sales: data });
            }   
        }
    );
});

app.get("/33120102/sales/unpaid", function (req, res) {
    db.collection("sales")
        .find({ status: "unpaid" })
        .toArray(function (err, data) {
            //if data is not found, redirect to invalid page
            if (data.length === 0) {
                res.sendFile(path.join(__dirname, "views", "noPaid.html"));
                return;
            }
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
    let id = new mongodb.ObjectID(req.query.id);
    db.collection("sales").deleteOne({ _id: id });
    res.redirect("/33120102/sales");
});

connectDB();
