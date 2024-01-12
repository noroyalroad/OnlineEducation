const dbconfig = require("./config/dbconfig.json");
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: dbconfig.host,
  user: dbconfig.user,
  port: dbconfig.port,
  password: dbconfig.password,
  database: dbconfig.database,
  connectionLimit: 5,
});

module.exports = pool;
