'use strict';

var https = require('https');

module.exports = {
  notify: function(msg) {
    var eventName = process.env.EVENT_NAME;
    var secretKey = process.env.SECRET_KEY;
    var body = JSON.stringify({value1: msg});
    var options = {
      hostname: 'maker.ifttt.com',
      path: '/trigger/' + eventName + '/with/key/' + secretKey,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    };

    https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(str) {
        console.log(str);
      });
    }).write(body);
  }
};
