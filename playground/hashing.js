const { SHA256 } = require("crypto-js");
const jwt = require("jsonwebtoken");

// var message = "I am user number 2";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

//.sign - takes the object, and creates the token value
//.verify - takes the token & secrets and make sure data was not manipulated

var data = {
  id: 10
};

var token = jwt.sign(data, "123abc");
console.log(token);

var decoded = jwt.verify(token, "123abc");
console.log("decoded", decoded);
