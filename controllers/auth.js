
var express = require('express');

// Authentication

var jwt = require('express-jwt');

module.exports.getAuth = function(){
    return jwt({
        secret: 'MY_SECRET',
        userProperty: 'payload'
    })
};


var User = require("../models/user");

// Default user
var admin = new User ({ name: "admin", email: "admin", userKind: "ADMIN"});
admin.setPassword("admin");
admin.save(function (err) {
    if (err){
        console.log("Usuário admin já cadastrado!");
    } else {
        console.log("Usuário admin criado!");
    }
});

module.exports.checkRole = function (req, res, next) {

    if (req.payload.userKind !== "ADMIN") {
        return res.sendStatus(401);
    } else {
        next();
    }

}