var mongoose = require("mongoose");

//1. Ensure that MongoDB is connected 1st before executing other commands, here we're using promises.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
};
