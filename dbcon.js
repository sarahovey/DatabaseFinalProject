var mysql = require('mysql');

//Move this to its own file soon, use dbconn from Flip for final
var conn = mysql.createConnection({
   host: "localhost" ,
   user: "sarahovey",
   password: "340DreamyCloset"
});

conn.connect(function(err){
   if(err){
       console.log(err);
   } 
   console.log("Connected!");
});