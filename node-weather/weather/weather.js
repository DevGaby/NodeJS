const request = require('request');
const GOOGLE_API_KEY = require('./../config');

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${GOOGLE_API_KEY.DARKSKY_API_KEY}/${lat},${lng}`,
    json: true
    }, (error, response, body) => {
      if (error) {
        callback('Eerreur de connexuion', null);
      } else {
          callback(null, body.currently)
      }
  })
}