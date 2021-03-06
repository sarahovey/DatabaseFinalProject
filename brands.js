module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var async = require('async');
    "use strict";
    
    function getBrands(mysql, callback){
        var q = "SELECT id, name FROM brands";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    
    //Get all brands
    router.get('/', function(req,res){
        var context = {};
        //context.jsscripts=["deleteBrand.js"];
        var mysql = req.app.get('mysql');
        
         async.parallel({
            brands: (err, cb) => getBrands(mysql, err, cb),
         }, function(err, context){
             if(err){
               return res.write(JSON.stringify(err));
             }
            
        res.render('brands', context);
           
      });
    });
    //Add a new brand
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO brands (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/brands');
            }
        });
    });
    
        
    // //Delete a brand, returns a 202 which is handled by AJAX
    // router.delete('/:id', function(req, res){
    //     var mysql = req.app.get('mysql');
    //     var q = "DELETE FROM brands WHERE id = ?";
    //     var inserts = [req.params.id];
    //     var sql = mysql.pool.query(q, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.status(400);
    //             res.end();
    //         }
    //         else{
    //             res.status(202).end();
    //         }
    //     });
    // });
    
    return router;
     
}();
