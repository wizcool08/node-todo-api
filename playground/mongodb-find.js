var { MongoClient, ObjectID } = require("mongodb");

//Connect to the DB, take two args - i) url:string(where db lives in), ii) callback fn()
MongoClient.connect("mongodb://localhost:27017/KyTodoApp", (error, client) => {
  if (error) {
    return console.log("Unable to connect to MongoDB server");
  }
  console.log("Connected to MongoDB server");
  const db = client.db("KyTodoApp");

// db.collection('Todos').find({completed:false}).toArray().then((docs) => {
//   console.log("Todos:", JSON.stringify(docs, undefined, 2))
// },(err) => {
//   return console.log("Unable to fetch todos", err);
// })

db.collection('Users').find({name:'James Tay'}).count().then((count) => {
  console.log("Todos count:",count );
},(err) => {
  return console.log("Unable to fetch todos", err);
})

  // client.close();
});
