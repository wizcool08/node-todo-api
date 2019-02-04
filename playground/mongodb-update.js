var { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/KyTodoApp", (error, client) => {
  if (error) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db("KyTodoApp");

  // findOneAndUpdate (filter, update, options, callback)

  // db.collection("Todos")
  //   .findOneAndUpdate(
  //     {
  //       _id: new ObjectID("5c57b5cbf9f6fbd319dd13b7")
  //     },
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     },
  //     { returnOriginal: false }
  //   )
  //   .then(result => {
  //     console.log(result);
  //   });

  db.collection("Users").findOneAndUpdate(
    {
      name: "Lim Kim Yong"
    },
    {
      $set: {
        name: "Lucas Lim"
      },
      $inc: {
        age: 29
      }
    },
    {
      returnOriginal: false
    }
  ).then((res) => {
    console.log(res);
  });

  // client.close();
});
