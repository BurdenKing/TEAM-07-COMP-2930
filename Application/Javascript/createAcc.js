var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createPool({
    connectionLimit : 50, 
    host: 'localhost',
    user: 'root',
    password: 'simple',
    database: 'parkaway_project'

});
