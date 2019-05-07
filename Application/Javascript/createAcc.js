const mysql = require('mysql');

cont connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'simple',
    database: 'parkaway'
});