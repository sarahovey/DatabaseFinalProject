var express    = require('express');
var mysql      = require('./dbcon.js');
var app        = express();
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var $          = require( 'jquery' );
// var dt         = require( 'datatables.net' )();

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
//app.set('port', process.argv[2]);
app.set('mysql', mysql);

// app.use((err, req, res, next){
//   res.sendStatus(err, httpStatusCode).json.stringify(err);
// })

app.use('/items', require('./items.js'));
app.use('/brands', require('./brands.js'));
app.use('/types', require('./types.js'));
app.use('/substyles', require('./substyles.js'));
app.use('/users', require('./users.js'));

app.get('/', function(req,res,next){
  res.redirect("/items");
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

//Listener
// app.listen(8080, function(){
//     console.log("Server running on 8080!");
// });

//listener for C9 env
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server is listening....");
})