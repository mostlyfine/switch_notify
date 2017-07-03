'use strict';

var client = require('cheerio-httpcli');
var ifttt = require('./ifttt');

module.exports.check = (event, context, callback) => {
  client.fetch('https://store.nintendo.co.jp/customize.html', function(err, $, res) {
    if (err) {
      callback(err);
    } else {
      $('.items').each(function(i) {
        var stock = $(this).text().split('/');
        if (stock[0] == 'HAC_S_KAYAA' && stock[1] != '-') {
          ifttt.notify(process.env.MESSAGE);
          callback(null, stock[1]);
        }
      });
    }
  });
};
