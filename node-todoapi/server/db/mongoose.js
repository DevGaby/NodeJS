const mongoose = require('mongoose');

// Paramétrage de mongoose
mongoose.Promise = global.Promise;

// Connection de mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp',
  {useNewUrlParser: true });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//cryptage du password
mongoose

// Exportation de mongoose
module.exports = { mongoose };

