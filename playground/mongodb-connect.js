var { MongoClient, ObjectID } = require("mongodb");

//Connect to the DB, take two args - i) url:string(where db lives in), ii) callback fn()
MongoClient.connect("mongodb://localhost:27017/KyTodoApp", (error, client) => {
  if (error) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db("KyTodoApp");

  // db.collection("Todos").insertOne(
  //   {
  //     text: "Deposit Money at 1pm - 3pm",
  //     completed: false
  //   },
  //   (err, result) => {
  //     if (err) {
  //       return console.log("Unable to insert todo", err);
  //     }
  //     console.log("Result:" + JSON.stringify(result.ops, undefined, 2));
  //   }
  // );

  // db.collection("Users").insertOne(
  //   {
  //     name: "Johnson Tay",
  //     age: 28,
  //     address: "9 Kim Tian Road, Singapore 168593"
  //   },
  //   (error, result) => {
  //     if (error) {
  //       return console.log("Unable to insert a new user record");
  //     }
  //     console.log("Result:", result.ops[0]._id.getTimestamp());
  //   }
  // );

  client.close();
});
