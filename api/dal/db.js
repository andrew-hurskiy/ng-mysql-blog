const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "tom",
  password: "tom",
  database: "blog",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

module.exports = db;