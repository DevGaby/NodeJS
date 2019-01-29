const http = require('http');
const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

// http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/mime'})
//     res.write('Blablabla');
//     res.end();

//     req.url
// }).listen(3000);

var app = express();

// Déclaration du moteur de rendu (vue)
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname +'/views/partials')

// Declaration folder public contenant files statiques
// Ex. http://127.0.0.1:3000/photo.jpg
app.use(express.static(__dirname+'/public'))

// Ex. Middleware == controle d'acces
app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('serveur.log', log + '/n', (err) => {
      if (err) {
        console.log('Logging impossible');
      }
    })
    next()
})

// Routes
app.get('/', (req, res)=> {
    res.send('Bye!');
})
app.get('/test', (req, res)=> {
    res.send('Test actif!');
})
app.get('/html', (req, res)=> {
    var html = 
    `
    <!DOCTYPE html>
    <html>
        <head>
            <title>HTML</title>
        </head>
        <body>
            <h1> HTML POUR VOUS SERVIR</h1>
        </body>
    </html>
    `
    res.send(html);
})
app.get('/bad',(req, res) => {
    var access = true
    if (access) {
    res.render('bad', {title:'Bad'})
    } else {
        res.status(401).send()
    }
})
app.listen(3000, () => {
    console.log('Serveur connecte - Port 3000');
})