const express = require('express');
var cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

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

var employees = [{ id: "X103", name: "John Smith", salary: 45000 },
{ id: "XT92", name: "Mary Murphy", salary: 41750 },
{ id: "B10C", name: "Alan Collins", salary: 40000 },
{ id: "YY12", name: "Brian Brogan", salary: 43250 }]

//GET methods for the two links
app.get('/', (req, res) => {
    res.redirect('/employees'); 
});

app.get('/employees', (req, res) => {   
    res.json(employees)
});

app.get('/employees/:id', (req, res) => {   
    var found = false; //avoid errors on server end when trying to send two responses

    Object.entries(employees).forEach((entry) => {
        const [key, employee] = entry;
        if(employee.id == req.params.id){
            res.json(employee)
            found = true;
        }
      });
      if(!found){
        res.send(`<h1>${req.params.id} does not exist</h1>`)
      }
});

app.get('/addEmployee', (req, res) => {
    res.send(`<h1><b>Add Employee</h1></b>
    <ul>
        <li>ID must be entered</li>
        <li>Salary must be between 10,000 and 59,000</li>
    </ul>
    <form action="addEmployee" method="post">
        ID: <input name="id"></input><br/>
        Name: <input name="name"></input><br/>
        Salary: <input name="salary"></input><br/>
        <input type="submit"/>
    </form>`)
});

app.post('/addEmployee', function (req, res) {
    if(req.body.id != "" && (req.body.salary >= 10000 && req.body.salary <= 59000)){
        let newEmployee = {id: req.body.id, name: req.body.name, salary: req.body.salary}
        employees.push(newEmployee)
        res.redirect("/employees")
    }
    else
        res.send("Incorrect Details!")
});

app.listen(port, () => console.log(`Visit http://localhost:${port}`))