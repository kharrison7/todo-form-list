//app.js code here.
let express = require('express');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const data = require('./items.js');
// Create app
let app = express();
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
  res.render('todo', data)});

// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  console.log("req sent");
  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    // req.checkBody("user", "You must enter a username!").notEmpty();

    console.log("User 1: " + req.body.user);

    // Render validation error messages
    // var errors = req.getValidationResult();
    // if (errors) {
    //   var html = errors;
    //   res.send(html);
    // } else {
      console.log("Body: " + req.body);
      var user = req.body.user;
      console.log("User 2: " + user);
      var html = '<p>Your user name is: </p>' + user;
      res.send(html);
    // }
  });

app.listen(3000, function(){
  console.log('Started express application!')
});
