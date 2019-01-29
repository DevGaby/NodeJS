var asyncAdd = (a, b) => {
    // return a+b; // Retour immediat = synC
    return new Promise ((resulve, reject) => {
      // 
      setTimeout(() => {
        if (typeof a === 'number' && typeof b === 'number') {
          resolve(a+b);
        } else {
          reject('Arguments non valable - Nombres uniquement')
        }
      })

    })
}

var promise1 = asyncAdd(5,9);
var promise2 = asyncAdd(5,9);

promise2.then(res => console.log(res));