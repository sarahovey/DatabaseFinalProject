module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var async = require('async');
    "use strict";

  function getSubstyles(mysql, callback){
        var q = "SELECT id, name, description FROM substyles";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    
    //Get all substyles
    router.get('/', function(req,res){
        var context = {};
        var mysql = req.app.get('mysql');
        
         async.parallel({
            substyles: (err, cb) => getSubstyles(mysql, err, cb),
         }, function(err, context){
             if(err){
               return res.write(JSON.stringify(err));
             }
            
        res.render('substyles', context);
           
      });
    });
    //Add a new type
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO substyles (name, description) VALUES (?,?)";
        var inserts = [req.body.name, req.body.description];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/substyles');
            }
        });
    });
    
    
    return router;
     
}();
