// Illustration du mécanisme d'un callback

var getUser = (id, callback) => {
    var user = {
      id:id,
      name:'DUPOND Marie'
    };
  
    //Execution synchrone
    //callback(user);
  
    // Exécution Async
    setTimeout(()=> {
      callback(user);
    }, 3000 );
  };
  
  var err  = () => console.log('Error System');
  
  getUser(3,() => {
    console.log('Lalala');
  });
  
  getUser(3, err => {
    console.log();
  });
  
  getUser(5, (userObject) => {
    console.log(userObject);
  });