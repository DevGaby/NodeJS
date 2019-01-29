const expect = require('expect'); // Mocha est une dependance expect
const request = require('supertest');

const {app} =  require('../server');
const {Todo} = require('../models/todo');

const todos = [
  { text : 'Todo numb 1'},
  { text : 'Todo numb 2'}
];

beforeEach((done)=> {
  Todo.deleteMany().then(() => {
    return Todo.insertMany(todos); // insertMany renvoit une promise
  }).then(() => done());
})

// Describe permet de reunir des tests unitaires
describe('POST /todos', () => {
  it('Creér un nvx todo', (done) => {
    var text =  'Test todo text';

    request(app)
     .post('/todos')
     .send({text})
     .expect(200)
     .expect(res => {
       expect(res.body.text).toBe(text)
       // toBe est le ===
     })
     .end(done) // exect tj une fction
  })

  it('Création impossible - body vide', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end(done)
  })
});

describe('GET /todos',() => {
  it('Reception de tous les todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  })
})