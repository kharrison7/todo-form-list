//app.js code here.
var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const data = require('./items.js');


// Create app
var app = express();

// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
//'expressValidator' must come after 'bodyParser', since data must be parsed first!
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  // Set 'action' to '/'
  res.render('users', data)
  // var html = '<form action="/" method="post">' +
  //            '<h1>User Name</h1>' +
  //            '<p>Enter a username</p>' +
  //            '<input type="text" name="user" placeholder="user name" />' +
  //            '<button type="submit">Submit</button>' +
  //       '</form>';
  // res.send(html);
});

// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    req.checkBody("user", "You must enter a username!").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
      // Render validation error messages
      var html = errors;
      res.send(html);
    } else {
      console.log("User: " + req.body.user);
      var user = req.body.user;
      var html = '<p>Your user name is: </p>' + user;
      res.send(html);
    }
  });

app.listen(3000, function(){
  console.log('Started express application!')
});
