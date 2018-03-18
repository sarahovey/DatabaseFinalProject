var mysql = require('mysql');
var pool = mysql.createPool({
   host: "localhost",
   port: "3306",
   user: "sarahovey",
   database: "dreamycloset"
   
});
module.exports.pool = pool;