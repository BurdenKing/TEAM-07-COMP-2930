const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require("fs");
const {JSDOM} = require('jsdom');

// STATIC DIRECTORIES
app.use('/HTML', express.static('HTML'));
app.use('/CSS', express.static('CSS'));
app.use('/Javascript', express.static('Javascript'));
app.use('/Images', express.static('Images'));

/**
let connection = mysql.createPool({
    connectionLimit : 50, 
    host: 'localhost',
    user: 'root',
    password: 'simple',
    database: 'parkaway_project'

});
 */

//DEFINING WEBSITE PATHS

app.get('/', (req, res) => {
    let doc = fs.readFileSync('./index.html', "utf8");
    let dom = new JSDOM(doc);
    //let $ = require("jquery")(dom.window); Not too sure if this is necessary

    res.send(dom.serialize());
});

app.get('/create-acc', (req, res) => {
    let doc = fs.readFileSync('./HTML/signUp.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/login', (req, res) => {
    let doc = fs.readFileSync('./HTML/login.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/contact', (req, res) => {
    let doc = fs.readFileSync('./HTML/contact.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/services', (req, res) => {
    let doc = fs.readFileSync('./HTML/services.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});

app.get('/about-us', (req, res) => {
    let doc = fs.readFileSync('./HTML/aboutUS.html', "utf8");
    let dom = new JSDOM(doc);

    res.send(dom.serialize());
});


app.use((req, res, next) => {
    res.status(404).send("Nothing there, 404.");
});

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});
