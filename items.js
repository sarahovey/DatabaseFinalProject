module.exports = function(){
    var express = require('express');
    var router = express.Router();
    var async = require('async');
    "use strict";
    
     
    function getItems(mysql, callback){
        var q= "SELECT items.id, item_types.name AS item_type, items.name, "+
        "brands.name AS brand, substyles.name AS substyle, users.name AS user "+ 
        "FROM items " +
        "INNER JOIN item_types ON item_type = item_types.id " +
        "INNER JOIN brands ON brand = brands.id "+
        "JOIN items_substyles ON(items.substyle = items_substyles.item_id) "+ 
        "JOIN substyles ON (items_substyles.style_id = substyles.id) "+
        "INNER JOIN users ON users.id = items.user_id";
        
        mysql.pool.query(q, function(err, results){
            if(err){
                console.log(err);
                return callback(err);
            }
            else{
            callback(null, results);
            }
        });
    }
    
    //For selecting one item
    function getItem(mysql, id, callback){
        var q= "SELECT items.id, item_types.name AS item_type, items.name, "+
        "brands.name AS brand, substyles.name AS substyle, users.name AS user "+ 
        "FROM items " + 
        "INNER JOIN item_types ON item_type = item_types.id " +
        "INNER JOIN brands ON brand = brands.id  "+
        "JOIN items_substyles ON(items.substyle = items_substyles.item_id) "+ 
        "JOIN substyles ON (items_substyles.style_id = substyles.id) "+
        "INNER JOIN users ON users.id = items.user_id WHERE id =" + id;
        
       mysql.pool.query(q, function(err, results){
             if(err){
                console.log(err);
                return callback(err);
            }
            else{
            callback(null, results);
            }
        });
    }
    function getTypes(mysql, callback){
        var q = "SELECT id, name FROM item_types";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    function getUsers(mysql, callback){
        var q = "SELECT id, name FROM users";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
     function getBrands(mysql, callback){
        var q = "SELECT id, name FROM brands";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    function getSubstyles(mysql, callback){
        var q = "SELECT id, name FROM substyles";
        mysql.pool.query(q, function(error, results, fields){
            if(error){ 
                return callback(error);
            }
            callback(null, results);
        });
    }
    // Display all items when the page loads
    router.get('/', function(req,res){
        var context = {};
        context.jsscripts=["deleteItem.js"];
        var mysql = req.app.get('mysql');
        
         async.parallel({
            items: (err, cb) => getItems(mysql, err, cb),
            types: (err, cb) => getTypes(mysql, err, cb),
            users: (err, cb) => getUsers(mysql, err, cb),
            brands: (err, cb) => getBrands(mysql, err, cb),
            substyles: (err, cb) => getSubstyles(mysql, err, cb)
         }, function(err, context){
             if(err){
               return res.write(JSON.stringify(err));
             }
            
        res.render('items', context);
           
      });
        
        
     });
    
    //Everything from here is only called when buttons are clicked 
    
    //Display 1 item for the sake of updating it
    router.get('/:id', function(req, res){
        var context = {};
        context.jsscripts = ["selectedUser.js", "selectedType.js", "selectedBrand.js", "selectedSubstyle.js", "updateItem.js"];
        var mysql = req.app.get('mysql');
        
        async.parallel({
            item: (err, cb) => getItem(req.params.id, err, cb),
            types: (err, cb) => getTypes(mysql, err, cb),
            users: (err, cb) => getUsers(mysql, err, cb),
            brands: (err, cb) => getBrands(mysql, err, cb),
            substyles: (err, cb) => getSubstyles(mysql, err, cb)
            
        }, function(err, context){
            if(err){
                res.write(JSON.stringify(err));
            }
            res.render('update-item', context);
        });
        
    });
    
    //Add an item, then redirect to items page
      router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO items (item_type, name, brand, substyle, user_id) VALUES (?,?,?,?,?)";
        var inserts = [req.body.type, req.body.name, req.body.brand, req.body.substyle, req.body.user];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/items');
                
            }
        });
    });
    
    //Add a new brand
     router.post('/brands', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO brands (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/items');
            }
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
                res.redirect('/items');
            }
        });
    });
    
    //Add a new substyle
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO substyles (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/items');
            }
        });
    });
    
    //URI for update data
     router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE items SET type=?, name=?, brand=?, substyle=? WHERE id=?";
        var inserts = [req.body.type, req.body.name, req.body.brand, req.body.substyles];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
            }else{
                res.status(200);
            }
            res.end();
        });
    });
    
    //Delete an item, returns a 202 which is handled by AJAX
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var q = "DELETE FROM items WHERE id = ?";
        var inserts = [req.params.id];
        var sql = mysql.pool.query(q, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }
            else{
                res.status(202).end();
            }
        });
    });
    
     return router;
        
}();