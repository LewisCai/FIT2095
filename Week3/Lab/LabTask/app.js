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

//example call /item/?name=apple&quality=5
app.get("/item", function (req, res) {
    let baseURL = "http://" + req.headers.host + "/";
    let url = new URL(req.url, baseURL);
    let ranNum= Math.round(Math.random()*10)
    let params = url.searchParams;
    console.log(params, ranNum);

    let item = {
        name: params.get("name"),
        quantity: params.get("quantity"),
    };

    console.log(parseInt(item.quantity), ranNum);

    res.send("The cost of " + item.name + " is " + parseInt(item.quantity)*ranNum + " dollars");
    }
);

//example call /contact
app.get('/contact', function (req, res) {
    fileName = VIEWS_PATH + "location.html";
    res.sendFile(fileName);
});

//anything else
app.get('*', function (req, res) {
    fileName = VIEWS_PATH + "404.html";
    res.sendFile(fileName);
}
);  