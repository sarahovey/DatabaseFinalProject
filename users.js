module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var async = require('async');
    "use strict";

  function getUsers(mysql, callback){
        var q = "SELECT id, name FROM users";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    
    //Get all users
    router.get('/', function(req,res){
        var context = {};
        var mysql = req.app.get('mysql');
        
         async.parallel({
            users: (err, cb) => getUsers(mysql, err, cb),
         }, function(err, context){
             if(err){
               return res.write(JSON.stringify(err));
             }
            
        res.render('users', context);
           
      });
    });
    //Add a new user
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO users (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/users');
            }
        });
    });
    
    
    return router;
     
}();
