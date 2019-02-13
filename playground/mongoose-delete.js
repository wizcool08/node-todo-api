const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { User } = require("../server/models/user");
const { Todo } = require("../server/models/todo");

// .remove() does not return us any remove objects, and
// to remove everything in the table record, you need to pass an arg - {} in the .remove() fn.
// Todo.remove({}).then(res => {
//   console.log(result);
// });

// Todo.findOneAndRemove() takes an {} object as arg
// Todo.findByIdAndRemove

// Todo.findOneAndRemove({ _id: "5c62ece3e8c80f1ed4c13d9b" }).then(todo => {
//   console.log(todo);
// });

Todo.findByIdAndRemove("5c62ece3e8c80f1ed4c13d9b").then(todo => {
  console.log(todo);
});
