var express = require("express");
var bodyParser = require("body-parser");
const { ObjectID } = require("mongodb");

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

//This file is just responsible for routes

var app = express();
const port = process.env.PORT || 3000;
//bodyParser takes the json and convert into an object
app.use(bodyParser.json());
// Create Todo using POST http request
app.post("/todos", (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    docs => {
      res.status(201).send(docs);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.status(200).send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

// GET /todos/123456
app.get("/todos/:id", (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch(e => {
      res.status(400).send(e);
    });
});

app.delete("/todos/:id", (req, res) => {
  // get the id
  var removeTodoId = req.params.id;

  // validate the id => not valid? return 404
  if (!ObjectID.isValid(removeTodoId)) {
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(removeTodoId).then(
    todo => {
      // if no doc, send 404
      if (!todo) {
        return res.status(404).send();
      }
      // if doc, send doc back with 200
      res.status(200).send(`Successfully removed ${todo}!`);
    },
    err => {
      return res.status(400).send(err);
    }
  );
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};
