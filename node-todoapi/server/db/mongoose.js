const mongoose = require('mongoose');

// Paramétrage de mongoose
mongoose.Promise = global.Promise;

// Connection de mongoose
mongoose.connect('mongodb://localhost:27017/TodoApp',
  {useNewUrlParser: true });

// Exportation de mongoose
module.exports ={ mongoose };

