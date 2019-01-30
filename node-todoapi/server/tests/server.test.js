const expect = require('expect'); // Mocha est une dependance expect
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} =  require('../server');
const {Todo} = require('../models/todo');

const todos = [
  { 
    _id: new ObjectID(),
    text : 'Todo numb 1'
  },
  { 
    _id: new ObjectID(),
    text : 'Todo numb 2'
  }
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
});

describe('GET /todos/id', () => {
  it('Retourne un todo avec un ID', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  })

  it('Retourne 404 si todo non-trouvé avec un ID', (done) => {
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  })

  it('Retourne 404 si ID non-conforme', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todos/id', () => {
  it('Supprime un todo avec un ID donné', (done) => {
    var id = todos[1]._id.toHexString();// force le formatage en hexa
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(id);
      })
      //.end(done); // end() est un fct qui attend 2 param err & res
      // Utile pour continuer un test
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(id).then(todo => {
          expect(todo).toBeFalsy(); // on attend de recevoir un null
          done();
        }).catch(err => done(err));
      });
  })

  it('Retourne 404 si todo non-trouvé', (done) => {
    var id = new ObjectID();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  })

  it('Retourne si todo non-conforme', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  })

});

describe('PATCH /todos/id', () => {
  it('Met à jour le todo donné en id', (done) => {
  var id = todos[0]._id.toHexString();
  var text = 'New text';
  request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: true})
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeTruthy();
      })
      .end(done);
  })

  it('Efface le completedAt si todo pas achevé', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'Nouveau texte';
    request(app)
      .patch(`/todos/${id}`)
      .send({text, completed: false})
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  })

});