var express = require('express');
var router = express.Router();


var User = require("../models/user");
var fs = require('fs');
var path = require('path');

router.post('/user', function (req, res) {
    
    var user = new User(req.body);
        user.save(function (err, next) {
          	if (err) {
            	return next(err);
           	}
          res.end()
     	});
    
});

router.get('/users', function (req, res) {

    User.find(function (err, user) {
            if (err) return console.error(err);
            res.send(user);
        });
    
});



module.exports = router;