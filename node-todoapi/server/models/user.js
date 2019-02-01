
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({ 
  email : { 
    type : String,
    required : true,
    trim: true,
    minlength: 4,
    unique: true,
    validate:{
      validator: validator.isEmail,  // fct qui renvoie un boolean pas de () car appel immediat
      message: 'Email invalide'

    }
  },
  password : { 
    type : String,
    required : true,
    minlength: 6,
  },
  tokens: [{ // Gestion acces routes
    access: {
      type: String,
      required:true
    }
  }]
});


// * Méthodes d'instance ** \\
UserSchema.method.toJSON = function() {
    var user =  this;
    var userObject = user.toOject();
    return _.pick(userObject, ['_id', '_email']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); // genere le token
    
    // Evite prbl eventiel avec .push
    user.tokens = user.tokens.concat([{access, token}]);

    // MAJ de l'user
    return user.save().then(()=> {
        return token;
    });
}

// * Méthodes de modéle ** \\
UserSchema.statics.findByCredentials = function(email, password){
    var User = this; //contexte du modele et non de l'obj
    return User.findOne({email}).then(user => {
      if (!user) {
        return Promise.reject(); // rejet immediat si user non-trouvé
      }
      // User trouvé comparer le password clair donné par user au password crypté en BDD
      return new Promise((resolve, reject)=>{
          bcrypt.compare(password, user.password, (err, res)=> {
            if(res){
                resolve(user);
            } else {
                reject()
            }
          }); // # fin du bcrypt
      }); // # fin Promise
    }); // # fin User.findOne()
}

UserSchema.statics.findByToken = function(token) {
    var user = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'abc123')
    } catch (e) {
        return Promise.reject();   
    }
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token, // boucle sur le tablo pour trouver le token
        'tokens.access': 'auth'
    });
}

//mongoose middleware
UserSchema.pre('save', function(next) {//declenche une fct avant un event
    var user = this; // Contexte binding
    //console.log(user);

    // Insertion ou maj d'un nx password
    if(user.isModified('password')) {
      //cryptage activé
      bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
              user.password = hash;
              next();
          })
      })
    } else {
        next();
    } 
  });

var User = mongoose.model('User', UserSchema);
module.exports = {User};