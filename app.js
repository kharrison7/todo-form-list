//app.js code here.
// runs at http://localhost:3000/
let express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
let expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const data = require('./items.js');

const file = './fill.json';

// Creates and includes a file system (fs) module
const fs = require('fs');

// Create app
let app = express();
// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'expressValidator' must come after 'bodyParser', since data must be parsed first!
app.use(expressValidator());

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
  console.log("Basic get run!");
  //fs.readFile reads the fill.json file
  fs.readFile('fill.json', 'utf8', function checkSortFile(err, d){

      if (err){
          console.log(err);
      } else {
      let value = JSON.parse(d);
      // This fills variables with the arrays from fill.json.
      let todoarray = value.todo_List;
      let donearray = value.completed;
      res.render('todo', { todosList: todoarray,  doneList: donearray});
  }});
});
app.post('/', function(req, res){
    let inputValue = req.body.user; //Gets the text in the input tag with name ="user"
    if( inputValue != "" && inputValue != null){ // This ignore inputs of "" or null
    fs.readFile('fill.json', 'utf8', function checkSortFile(err, data){
        if (err){
            console.log(err);
        } else {
        let value = JSON.parse(data); //converts to an object
        value.todo_List.push(inputValue);
        json = JSON.stringify(value); //converts back to json
        fs.writeFile('fill.json', json, 'utf8'); // writes to file fill.json with json
        //utf8 is a file format character encoding.
    }})};
    res.redirect('/');//reloads page
  });

  // This is what removes the values upon completion.
  //This is dynamic, meaning any time a button besides "/" is clicked this will fire.
  app.post("/:dynamic", function (req, res) {
    fs.readFile('fill.json', 'utf8', function checkSortFile(err, data){
        if (err){
            console.log(err);
        } else {
        let val = JSON.parse(data); //val is an object filled with the json data of fill.json
          for (let i = 0; i < val.todo_List.length; i++){
            if (val.todo_List[i] === req.params.dynamic){//dynamic being whatever is clicked on
              let alt = val.todo_List[i];
              console.log("Alteration: " + alt);
              val.completed.push(alt);
              val.todo_List.splice(i, 1);
            }
          }
        json = JSON.stringify(val); //converts a JavaScript value to a JSON string
        fs.writeFile('fill.json', json, 'utf8');
    }});
    res.redirect('/');
  });
  app.delete('/', function(req, res){
    console.log("delete active");
    // res.redirect('/');
    });
app.listen(3000, function(){
  console.log('Started express application!')
});
