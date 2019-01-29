const mongoose = require('mongoose');

var  Todo = mongoose.model('Todo', {
    text: { // df plus en detail l'attribut
      type: String,
      required: true,
      minlength: 1,
      trim: true // Elimine les espaces
    },
    completed:{
      type: Boolean,
      default: false
    },
    completedAt: {
      type : Number,
      default: null
    }
});

module.exports = { Todo };
