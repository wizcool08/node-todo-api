var express = require("express");
var bodyParser = require("body-parser");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

//This file is just responsible for routes

var app = express();
//bodyParser takes the json and convert into an object
app.use(bodyParser.json());
// Create Todo using POST http request
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    docs => {
      res.send(docs);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.listen(3000, () => {
  console.log("Started on port 3000");
});
