const expect = require("expect");
const request = require("supertest");

const { app } = require("../server");
const { Todo } = require("../models/todo");

beforeEach(done => {
  Todo.remove({}).then(() => {
    done();
  });
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

        Todo.find()
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
            expect(todos.length).toBe(0);
            done();
          })
          .catch(e => done(e));
      });
  });
});
