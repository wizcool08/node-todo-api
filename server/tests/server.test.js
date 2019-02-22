const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");

const { app } = require("../server");
const { Todo } = require("../models/todo");

const todos = [
  {
    _id: new ObjectID(),
    text: "First test todo"
  },
  {
    _id: new ObjectID(),
    text: "Second test todo"
  }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});
// When testing with async, you need to specific done as the argument
/**
 * Testing post todo endpoint
 */
describe("POST /todos", () => {
  it("should create a new todo", done => {
    let text = "Test Dummy Todo";

    request(app)
      .post("/todos")
      .send({ text })
      .set("Accept", "application/json")
      .expect(201)
      .expect(res => {
        expect("Content-Type", /json/);
        expect(res.body.text).toBe(text);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it("should not create todo with invalid body data", done => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end(err => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

// Non-synchronize test
describe("GET /todos", () => {
  it("should get all todos", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("should return todo doc by ID", done => {
    var id = todos[0]._id;
    request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it("should return 404 if todo not found in collection", done => {
    var IdNotFound = new ObjectID();
    request(app)
      .get(`/todos/${IdNotFound.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for non-object ids", done => {
    var invalidObjID = "123";
    request(app)
      .get(`/todos/${invalidObjID}`)
      .expect(404)
      .end(done);
  });
});

//  i) Test the Delete request is working + verify if the record has been deleted
describe("DELETE /todos/:id", () => {
  it("should remove todo doc by ID", done => {
    var id = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
        expect(res.body.todo.text).toBe(todos[1].text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        // query DB using findByID toNotExist
        // expect(null).toNotExist();
        Todo.findById(id)
          .then(todo => {
            expect(todo).toNotExist();
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should return 404 if todo not found in collection", done => {
    var IdNotFound = new ObjectID();
    request(app)
      .delete(`/todo/${IdNotFound.toHexString()}`)
      .expect(404)
      .end(done);
  });

  it("should return 404 for non-object ids", done => {
    var invalidObjID = "abc123";
    request(app)
      .delete(`/todos/${invalidObjID}`)
      .expect(404)
      .end(done);
  });
});

describe.only("PATCH /todos/:id", () => {
  it("should update todo doc by ID", done => {
    // get the id of first item
    // update text, and set completed true
    // return 200
    // text is changed, completed is true, completedAt is a number .toBeA
    var id = todos[0]._id.toHexString();
    var text = "Test completed YAY";

    request(app)
      .patch(`/todos/${id}`)
      .send({ text, completed: true })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completed_at).toBeA("number");
      })
      .end(done);
  });

  it("should clear completedAt when todo is not completed", done => {
    // grab id of second toDo item
    let hexId = todos[1]._id.toHexString();
    var text = "This should be the new text!!!";
    // update text, set completed to false
    request(app)
      .patch(`/todos/${hexId}`)
      .send({ text, completed: false })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completed_at).toNotExist();
      })
      .end(done);
    // text is changed, completed false, completedAt is null .toNotExist
  });
});
