//app.js code here.
let express = require('express');
const path = require('path');
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

let todosList = [];
// {entry: "Example Todo", done: "false"}
app.get('/', function(req, res){
  // Set 'action' to '/'
  console.log("Basic get run!");
  // console.log("Last item: "+todosList[todosList.length-1].entry);
  res.render('todo', {todo_list: todosList})});



// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  console.log("post active: Added a todo");
  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    // req.checkBody("user", "You must enter a username!").notEmpty();


    // Render validation error messages
    // var errors = req.validationErrors();
    // var errors = req.getValidationResult();
    // if (errors) {
    //   var html = errors;
    //   res.send(html);
    // } else {
      let user = req.body.user;
    //   console.log("Entry: " + user);
      // var html = '<p>Your user name is: </p>' + user;
      // res.send(html);
      todosList.push({entry: `${user}`, done: "false"});
      res.redirect('/');
      // res.render('todo', data);
    // }
  });



  app.delete('/', function(req, res){
    console.log("delete active");
    // res.redirect('/');
    });


app.listen(3030, function(){
  console.log('Started express application!')
});
