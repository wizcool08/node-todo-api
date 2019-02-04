var { MongoClient, ObjectID } = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/KyTodoApp", (error, client) => {
  if (error) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db("KyTodoApp");

  // deleteMany
  // db.collection('Users').deleteMany({name:"Johnson Tay"}).then((result) => {
  //   console.log(result)
  // })

  // deleteOne

  // findOneAndDelete using the ObjectID
  db.collection("Users")
    .findOneAndDelete({ _id: new ObjectID("5c57c3c2f9f6fbd319dd170a") })
    .then(result => {
      console.log(JSON.stringify(result, undefined, 2));
    });

  // client.close();
});
