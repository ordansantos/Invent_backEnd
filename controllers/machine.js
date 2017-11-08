var express = require('express');
var router = express.Router();

var Machine = require('../models/machine');
var fs = require('fs');
var path = require('path');

router.post('/machine', function (req, res) {

    var machine = new Machine(req.body);
        machine.save(function (err, next) {
          	if (err) {
            	return next(err);
           	}
          res.end()
     	});

});

router.get('/machines', function (req, res) {

    Machine.find(function (err, machine) {
            if (err) return console.error(err);
            res.send(machine);
        });

});



module.exports = router;
