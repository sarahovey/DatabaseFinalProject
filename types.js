module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var async = require('async');
    "use strict";

  function getTypes(mysql, callback){
        var q = "SELECT id, name FROM item_types";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    
    //Get all types
    router.get('/', function(req,res){
        var context = {};
        var mysql = req.app.get('mysql');
        
         async.parallel({
            types: (err, cb) => getTypes(mysql, err, cb),
         }, function(err, context){
             if(err){
               return res.write(JSON.stringify(err));
             }
            
        res.render('types', context);
           
      });
    });
    //Add a new type
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO item_types (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/types');
            }
        });
    });
    
    
    return router;
     
}();
