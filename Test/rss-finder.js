'use strict';
 
var rssFinder = require('rss-finder');
 
rssFinder('http://www.nytimes.com').then(function(res) {
    console.log(res);
}).catch(function(err) {
    console.log(err);
});