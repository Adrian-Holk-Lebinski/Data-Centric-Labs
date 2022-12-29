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
app.set('view engine', "ejs");

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
    database.getStudents()
    .then((data) => {
        res.render("showStudents", {"students": data})

    })
    .catch((error) => {
        console.log("pool error " + error)
    })
})

app.get("/students/:sid", (req, res) => {
    let studentFound = false;
    database.getStudents()
    .then((data) => {
        data.forEach(student => {
            if(student.student_id == req.params.sid){
                console.log(student)
                res.render("showStudent", {"student": student})
                studentFound = true;
            }
        });
    })
    .catch((error) => {
        console.log("pool error " + error)
    })
    if(studentFound == false){
        res.send(`<h1>No such student with SID ${req.params.sid}<h1/>`)
    }
})

app.get("/students/delete/:sid", (req, res) => {
    console.log(req.params.sid)
    database.deleteStudent(req.params.sid)
    .then((date) => {
    res.redirect("/")
    })
    .catch((error) => {
        res.send(`<h1>Could not remove student ${req.params.sid} since there is a foreign key constraint</h1>`)
    })
})

app.listen(port, () => console.log(`Visit http://localhost:${port}`))