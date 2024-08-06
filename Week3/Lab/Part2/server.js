let express = require("express");
let app = express();
let url = require("url");
// Database is an array of records
let db = [];
//First record is an object contains the three attributes
let parcel = {
    id: 123,
    sender: "HI",
    address: "Mel",
};
//Insert the first record to the db
db.push(parcel);
app.get("/", function (req, res) {
    res.send("Hello from FIT2095");
});
app.get("/getParcels", function (req, res) {
    res.send(generateList());
});
app.get("/addParcel", function (req, res) {
    let baseURL = "http://" + req.headers.host + "/";
    let url = new URL(req.url, baseURL);
    let newId= Math.round(Math.random()*1000)
    let params = url.searchParams;
    console.log(params);

    let parcel = {
        id: newId,
        sender: params.get("sender"),
        address: params.get("address"),
    };

    db.push(parcel);
    res.send(generateList());
});

// Update the delete route to capture the id from the URL path
app.get("/deleteid/:id", function (req, res) {
    let id = req.params.id; // Get the id from the URL path
    deleteParcel(id);
    res.send(generateList());
});

app.listen(8080);

function deleteParcel(id) {
    const index = db.findIndex(parcel => parcel.id == id);
    if (index !== -1) {
        db.splice(index, 1);
    }
}

function generateList() {
    let st = "ID  Sender   Address  </br>";
    for (let i = 0; i < db.length; i++) {
        st += db[i].id + " | " + db[i].sender + " | " + db[i].address + "</br>";
    }
    return st;
}