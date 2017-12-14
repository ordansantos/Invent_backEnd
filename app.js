
var app = require('./config/express')();

require('./config/database.js')('mongodb://inventuser:invent123@ds125565.mlab.com:25565/heroku_6qnvmz38');

// Authentication
require('./config/passport');

module.exports = app;

var schedule = require('node-schedule');
