//REQUIRES
const express = require('express');
const app = express();
const fs = require("fs");
const {JSDOM} = require('jsdom');
const config = require('./Application/Javascript/config.js');
const mysql = require('mysql');
let bodyParser = require('body-parser');


// STATIC DIRECTORIES
app.use('/Application/HTML', express.static('HTML'));
app.use('/Application/CSS', express.static('CSS'));
app.use('/Application/Javascript', express.static('Javascript'));
app.use('/Application/Images', express.static('Images'));

let connection = mysql.createConnection(config);

//Attempt to connect to MySQL. Make sure you turn on XAMPP.
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to the database.')
        return;
    }
    console.log('Connected to the database!');
})

//DEFINING WEBSITE PATHS
app.get('/', (req, res) => {
    let doc = fs.readFileSync('./Application/main.html', "utf8");
    let dom = new JSDOM(doc);
    //let $ = require("jquery")(dom.window);
    //Will uncomment if jquery render does not show

    res.send(dom.serialize());
});

app.get('/create-acc', (req, res) => {
    let doc = fs.readFileSync('./Application/HTML/signUp.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/login', (req, res) => {
    let doc = fs.readFileSync('./Application/HTML/login.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/contact', (req, res) => {
    let doc = fs.readFileSync('./Application/HTML/contact.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/services', (req, res) => {
    let doc = fs.readFileSync('./Application/HTML/services.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/about-us', (req, res) => {
    let doc = fs.readFileSync('./Application/HTML/aboutUS.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

//BODYPARSER MIDDLEWARE FOR POST REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//POST REQUESTS
app.post('/create-acc', function (req, res) {
    res.setHeader('Content-Type', 'application/json');

    console.log("Stuff sent to server", req.body);

    res.send(["You sent me:", req.body]);
});

app.use((req, res, next) => {
    res.status(404).send("Nothing there, 404.");
});

//azure
const port = process.env.PORT || 1337;
server.listen(port);

    

/** 
//CONNECT TO LOCALHOST:8000
app.listen(8000, () => {
    console.log('App listening on port 8000!');
}); */
