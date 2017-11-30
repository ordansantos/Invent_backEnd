
var express = require('express');

// Authentication

var jwt = require('express-jwt');

module.exports.getAuth = function(){
    return jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    })
}
