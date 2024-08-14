const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
const PORT_NUMBER = 8081;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/image"));
app.use(express.static("public/css"));

// Configure Express for EJS
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

app.listen(PORT_NUMBER, () => {
	console.log(`Listening on port ${PORT_NUMBER}`);
});

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "views/index.html"));
});

app.get("/addition", function (req, res) {
	res.sendFile(path.join(__dirname, "views/addition.html"));
});

app.get("/subtraction", function (req, res) {
	res.sendFile(path.join(__dirname, "views/subtraction.html"));
});

app.post("/addition", function (req, res) {
	let obj = req.body;
	let n1 = obj.no1;
	let n2 = obj.no2;
	let result = parseInt(n1) + parseInt(n2);
	res.render("result", { no1: n1, no2: n2, result: result, op: "+" });
});

app.post("/subtraction", function (req, res) {
	let obj = req.body;
	let n1 = obj.no1;
	let n2 = obj.no2;
	let result = parseInt(n1) - parseInt(n2);
	res.render("result", { no1: n1, no2: n2, result: result, op: "-" });
});

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "views/404.html"));
});


