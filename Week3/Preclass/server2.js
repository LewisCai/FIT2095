let express = require("express");
let app = express();
let url = require("url");
// Database is an array of records
let db = [];
//First record is an object contains the three attributes
let rec = {
    name: "Tim",
    age: 23,
    address: "Mel",
};
//Insert the first record to the db
db.push(rec);
app.get("/", function (req, res) {
    res.send("Hello from FIT2095");
});
app.get("/list", function (req, res) {
    res.send(generateList());
});
app.get("/newuser", function (req, res) {
    let baseURL = "http://" + req.headers.host + "/";
    let url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);

    let newRec = {
        name: params.get("name"),
        age: params.get("age"),
        address: params.get("address"),
    };
    db.push(newRec);
    res.send(generateList());
});

app.get("/delete", function (req, res) {
    let baseURL = "http://" + req.headers.host + "/";
    let url = new URL(req.url, baseURL);
    let params = url.searchParams;
    console.log(params);
    deleteUser(params.get("id"));
    res.send(generateList());
});

app.listen(8080);

function deleteUser(id) {
    db.splice(id, 1);
}

function generateList() {
    let st = "Name  Age   Address  </br>";
    for (let i = 0; i < db.length; i++) {
        st += db[i].name + " | " + db[i].age + " | " + db[i].address + "</br>";
    }
    return st;
}