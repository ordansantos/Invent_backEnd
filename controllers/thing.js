var express = require('express');
var router = express.Router();


var Thing = require("../models/thing");
var fs = require('fs');
var path = require('path');

router.post('/thing', function (req, res) {
    
    var thing = new Thing(req.body);
        thing.save(function (err, next) {
          	if (err) {
            	return next(err);
           	}
          res.end()
     	});
    
});

router.get('/things', function (req, res) {

    Thing.find(function (err, thing) {
            if (err) return console.error(err);
            res.send(thing);
        });
    
});



module.exports = router;