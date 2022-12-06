const express = require('express')
var cors = require('cors')
const app = express()
const path = require('path')
const port = 3000
var detailsRequestNumber = 0;

let page_visits = 0;
let routes = ["/", "/about"];
let visits = function (req, res, next) {
    if(routes.includes(req.originalUrl)){
        page_visits++;
        console.log(`Server instance ${page_visits} of ${req.originalUrl}`);
    } 
    next();
}; 
app.use(visits);

app.get('/', (req, res) => {
    res.send("This is question 1.1")
})

app.get('/about', (req, res) => {
    res.send("This is the about page")
}) 

app.get('/details', (req, res) => {
    detailsRequestNumber++;
    var date = new Date().toISOString().substr(11, 8);
    console.log(`/details request number: ${detailsRequestNumber} from: ${req.hostname} at: ${date}`);
    res.redirect('/'); 
})

app.listen(port, () => console.log(`Visit http://localhost:${port}`))