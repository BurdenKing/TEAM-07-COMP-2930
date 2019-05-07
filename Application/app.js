const express = require('express');
const mysql = require('mysql');
const app = express();
const fs = require("fs");
const {JSDOM} = require('jsdom');

// STATIC DIRECTORIES
app.use('/HTML', express.static('html'));
app.use('/CSS', express.static('css'));
app.use('/JavaScript', express.static('js'));
app.use('/Images', express.static('img'));

/**
let connection = mysql.createPool({
    connectionLimit : 50, 
    host: 'localhost',
    user: 'root',
    password: 'simple',
    database: 'parkaway_project'

});
 */

app.get('/', (req, res) => {
    let doc = fs.readFileSync('./HTML/main.html', "utf8");
    let dom = new JSDOM(doc);
    let $ = require("jquery")(dom.window);

    res.send(dom.serialize());
});

app.use((req, res, next) => {
    res.status(404).send("Nothing there, 404.");
});

app.listen(8000, () => {
    console.log('Example app listening on port 8000!');
});
