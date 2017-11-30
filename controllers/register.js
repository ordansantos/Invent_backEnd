
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var User = require('../models/user');

router.post('/register', function(req, res) {

    var user = new User();

    user.name = req.body.name;

    user.email = req.body.email;

    if (req.body.password === '' || !req.body.password){

        res.json({"message" : "Senha vazia"});
        res.status(401);

    } else {

        user.setPassword(req.body.password);

        user.save(function (err) {
            var token;
            token = user.generateJwt();
            if (err) {
                res.json({"message": err.name + ": " + err.message});
                res.status(401);
                return console.error(err);
            }
            res.status(200);
            res.json({
                "token": token
            });
        });
    }
});

module.exports = router;