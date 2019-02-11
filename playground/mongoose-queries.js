const { ObjectID } = require("mongodb");

const { mongoose } = require("../server/db/mongoose");
const { User } = require("../server/models/user");

var id = "5c5cf8a22bc9467e44d4d54c";

// if (!ObjectID.isValid(id)) {
//   return console.log("User ID not valid!");
// }

// User.find({
//   _id: id
// }).then(users => {
//   console.log("Users", users);
// });

// User.findOne({
//   _id: id
// }).then(user => {
//   console.log("User", user);
// });

User.findById(id).then(
  res => {
    if (!res) {
      return console.log("Id not found");
    }
    console.log(`User Id found: ${JSON.stringify(res, undefined, 2)}`);
  },
  e => console.log(e)
);
