Demarrer l'application avec : npm init
    >> Genere le package.json

Télécharger : npm i --save express body-parser lodash dev mocha expect supertest nodemon
    express Gestion des routes
    body-parser Décode les donnees du corps de le requete
    lodash 
    
    npm i --save-dev 
    mocha 
    expect 
    supertest 
    nodemon Garde le serveur en continu
    >> Genere le package-lock.json

    * Penser à rajouter :
        "test-watch": "nodemon --exec npm run test"
        dans le script du package.json

    npm i --save validator bcryptjs jsonwebtoken
    >> Gestion token
******************************************
Application NodeJs

Permettant de créer une api 

******************************************
Telechargement d'aps complémentaires :
    - PostMan
    - Robo 3T
    - Mongoose
Si mongoose non reconnu modifier la variable d'environnement
******************************************
Lancement de l'aps : 
    1- se placer ds server.js et faire npm test-watch
    2- verifier dans robo 3T la Todo
    3- test dans Postman