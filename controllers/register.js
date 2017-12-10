
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

        res.status(400).send({ error: "Senha vazia" });

    } else {

        user.setPassword(req.body.password);

        user.save(function (err) {
            var token;
            token = user.generateJwt();
            if (err) {
                res.status(400).send({ message: "Usuário com esse email já existe" });
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