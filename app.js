//app.js code here.
let express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const data = require('./items.js');

const file = './fill.json';
const fs = require('fs');

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

// let todosList = [];
// {entry: "Example Todo", done: "false"}
app.get('/', function(req, res){
  // Set 'action' to '/'
  console.log("Basic get run!");
  // console.log("Last item: "+todosList[todosList.length-1].entry);
  // res.render('todo', {todo_list: todosList})});

  //fs.readFile reads the fill.json file
  fs.readFile('fill.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      obj = JSON.parse(data);//Turns fill.json into an object named obj
      var todoarray = obj.todoArray; //declares makes the todoarray
      var donearray = obj.doneArray; //declares makes the donearray
      // this makes todosMustache the todoarray var
      res.render('todo', { todosMustache: todoarray,  doneMustache: donearray});
  }});
  // This will make todosMustache the todosArray
  // res.render('todo', { todosMustache: todosArray });
});





// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  console.log("post active: Added a todo");
  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    // req.checkBody("user", "You must enter a username!").notEmpty();

    var addtolist = req.body.user; //Gets the text in the input tag with name ="user"
    fs.readFile('fill.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now its an object
        obj.todoArray.push(addtolist); //pushes the text to an array
        json = JSON.stringify(obj); //converts back to json
        fs.writeFile('fill.json', json, 'utf8'); // writes to file
    }});
    res.redirect('/');//reloads page

    // Render validation error messages
    // var errors = req.validationErrors();
    // var errors = req.getValidationResult();
    // if (errors) {
    //   var html = errors;
    //   res.send(html);
    // } else {
      // let user = req.body.user;
    //   console.log("Entry: " + user);
      // var html = '<p>Your user name is: </p>' + user;
      // res.send(html);
      // todosList.push({entry: `${user}`, done: "false"});
      // res.redirect('/');
      // res.render('todo', data);
    // }
  });


  //This is dynamic, meaning any time i click a button that is not "/", this will fire
  app.post("/:dynamic", function (req, res) {
    fs.readFile('fill.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now its an object
          // iterate over each element in the array
          for (var i = 0; i < obj.todoArray.length; i++){
          // look for the entry with a matching value
            if (obj.todoArray[i] === req.params.dynamic){//req.params.dynamic finds the value of dynamic
              var change = obj.todoArray[i]; //this sets change to the string to delete
              console.log("I am deleting " + change);//logs the string to delete
              obj.doneArray.push(change);//pushes the string to delete to the done array
              obj.todoArray.splice(i, 1);//splices the string from the to do array
            }
          }
        json = JSON.stringify(obj); //converts back to json
        fs.writeFile('fill.json', json, 'utf8'); // writes to file
    }});
    res.redirect('/');//reloads page
  });



  app.delete('/', function(req, res){
    console.log("delete active");
    // res.redirect('/');
    });


app.listen(3030, function(){
  console.log('Started express application!')
});
