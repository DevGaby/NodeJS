const request = require('request');
const GOOGLE_API_KEY = require('./../config');

var geocodeAddress = (address, callback) => {
    var addressEncoded = encodeURIComponent(address);
    request({
      url:`https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${GOOGLE_API_KEY}`,
      json: true
      }, (error, response,body) => {
      if (error) {
        callback('Connexion impossible', null )
      } else if (body.status === 'ZERO_RESULTS') {
          callback(" Aucun résultat trouvé", null)
      } else if (body.status === 'OK') {
          callback(null, {
            address: body.results[0].formatted_address, 
            lat: body.results[0].geometry.location.lat,
            lng: body.results[0].geometry.location.lng,
          });
      } else {
        //
      }
    }); // Fin fct request
};  // Fin fct geocodeAddress

module.exports = {
    geocodeAddress,
}