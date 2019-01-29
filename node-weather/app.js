const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');


const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Adresse dont on souhaite les coordonnées',
      string: true
    }
  })
  .help() // genere une aide
  .alias('help', 'h')
  .argv; //

// Appel avec node .\app.js -a 'Nom de la ville'
  //console.log(argv.address); 
  geocode.geocodeAddress(argv.address,(errorMessage, results) => {
    if (errorMessage) {
      console.log(errorMessage);
    } else {
    //   console.log(results.lat);
    //   console.log(results.lng);
    WebAuthnAssertion.getWeather(results.lat, results.lng, (err, res) => {
      if (err) {
          console.log(err);
      } else {
          console.log('La temperature actuelle est de : ${res}');
      }
    });
    }
  });