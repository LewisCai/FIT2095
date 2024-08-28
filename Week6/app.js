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
    try {
        await client.connect();
        db = client.db("fit2095");
        collection = db.collection("sales");
        console.log("Connected to DB successfully");
    } catch (err) {
        console.error("Failed to connect to DB", err);
    }
}

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/33120102/sales", async function (req, res) {
    const data = await db.collection("sales").find({}).toArray();
    if (data.length === 0) {
        res.sendFile(path.join(__dirname, "views", "noSales.html"));
    } else {
        res.render("listsales", { sales: data });
    }
});

app.get("/33120102/sales/unpaid", async function (req, res) {
    const data = await db.collection("sales").find({ isPaid: false }).toArray();
    if (data.length === 0) {
        res.sendFile(path.join(__dirname, "views", "noPaid.html"));
    } else {
        res.render("listsales", { sales: data });
    }
});

app.get("/33120102/sales/add", function (req, res) {
    res.sendFile(path.join(__dirname, "views", "add_sale.html"));
});

app.post("/33120102/sales/add", async function (req, res) {
    let sale = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        quantity: parseInt(req.body.quantity),
        isPaid: req.body.isPaid === "true",
    };
    await db.collection("sales").insertOne(sale);
    res.redirect("/33120102/sales");
});

app.get("/33120102/sales/remove", async function (req, res) {
    await db.collection("sales").deleteMany({});
    res.redirect("/33120102/sales");
});

connectDB().then(() => console.log("Database connection established"));