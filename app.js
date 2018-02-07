var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/invent-backEnd');


// Authentication
require('./config/passport');


module.exports = app;

var schedule = require('node-schedule');

