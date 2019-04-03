var dbconfig = require("../config/database");
var mysql = require("mysql");
var connection = mysql.createConnection(dbconfig.connection);

connection.query(`CREATE DATABASE IF NOT EXISTS ${dbconfig.database}`, function(
  err,
  rows
) {
  console.log(err);
});

connection.query(
  `CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT,username VARCHAR(255), password CHAR(64), primary key (id))`,
  function(err, rows) {
    console.log(err);
  }
);
