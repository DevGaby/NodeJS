const express = require('express');
const bodyParser = require('body-parser');
const  _ = require('lodash'); // refererncer par _ comme $ pour jquery
const {ObjectID} = require('mongodb');

// {} Permet exporte la valeur de l'obj mongoose
const { mongoose } = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./../server/mildleware/authenticate');
var app = express();

// Middleware décodant le json inclus dans le body des requetes
app.use(bodyParser.json());



// ** Routes TODO ** \\
//https://httpstatuses.com/ Elles se testent sur POSTMAN
// POST /todos
app.post('/todos', (req, res) => {
  var todo = new Todo ({
    text: req.body.text
  });
  todo.save().then(doc => {
    res.status(200).send(doc)
  }).catch(err => {
    res.status(400).send(err);
  })
});
// app.post('/todos', (req, res) => {
//     var todo = req.body;
//     res.send(todo.text);
//     //res.send('Ajout de todo')
// })

// GET /todos
app.get('/todos', (req, res) => {
  // ttes les methode mongoose renvoient des promises
  Todo.find().then(todos => {
    res.status(200).send({todos}); // crée une clé todos
  }).catch(err => {
    res.status(400).send(err);
  })
});

// GET /todos/id
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).send();
      // return permet de sortir du Get
    }
    res.status(200).send({todo});
  }).catch(err => {
    res.status(400).send(err);
  })
});

// DELETE /todos/id
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  Todo.findByIdAndDelete(id).then(todo => {
    // findByIdAndDelete() renvoie l'obj supprimé
    if (!todo) {
      return res.status(404).send()
    }
    res.status(200).send({todo});
  }).catch(err => res.status(400).send(err))
});

// PATCH /todos/id
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text','completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  if (_.isBoolean(body.completed) && body.completed) {
    // Par deduction body.completed === true
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {$set:body}, {new:true})
    .then( todo => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({todo});
    }).catch(err => res.status(400).send())
  });

// ** Routes User ** \\
// POST /users
app.post('/users', (req, res)=> {
  var body = _.pick(req.body, ['email', 'password']); // .pick permet d'extraire des données
  var user = new User(body);

  user.save().then(doc => {
    res.status(200).send(doc);
  }).catch(err => {
    res.status(400).send(err);
  })
});

// POST /users/login
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then(user => {
      //res.status(200).send(user);
      user.generateAuthToken().then(token => {
        res.header('x-auth', token).send(user); //x- entete personalisé
      }) // on utilise le catch du bas
    })
    .catch(err=> {
      res.status(400).send(err);
    })
});

// GET /users/me
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)
});

//////////////////////////// - \\\\\\\\\\\\\\\\\\\\\\
app.listen(3000, () => {
  console.log('Serveur connecté - Port 3000');
});

module.exports = {app};