
const bcrypt = require('bcryptjs');

var password = 'abc123';

bcrypt.genSalt(10, (err, salt)=> {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);  
    });
});

var hashedPassword = '' // Résultat du cryptage lu dans node playground/hashing.js
bcrypt.compare(password, hashedPassword,(err, res) => {
    console.log(res);
    
})