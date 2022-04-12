const mysql = require('mysql');

const connectionString = process.env.CLEARDB_DATABASE_URL;

const db = mysql.createConnection(connectionString);

module.exports = db;

