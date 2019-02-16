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
describe.only("DELETE /todos/:id", () => {
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
