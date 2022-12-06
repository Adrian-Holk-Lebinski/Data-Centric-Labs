//import modules
const database = require("./database")
const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();

//used for indentation in json output
app.set('json spaces', 2)

// Add the body parser to the app
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    database.getDepartment()
    .then((data) => {
        console.log(data)
        let html = ejs.render(`<ul><li><%= data %></li><ul/>`, {data: data});
        res.send(html)
    })
    .catch((error) => {
        console.log("pool error " + error)
    })
})

app.listen(port, () => console.log(`Visit http://localhost:${port}`))