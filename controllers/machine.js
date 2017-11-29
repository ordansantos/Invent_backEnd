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

router.post('/machinesInRoom', function (req, res) {

    var roomID = req.body.room;
        Machine.find({room: roomID} , function (err, machine) {
            if (err) return console.error(err);
            res.send(machine);
        });

});

router.get('/machines', function (req, res) {

    Machine.find(function (err, machine) {
            if (err) return console.error(err);
            res.send(machine);
        });

});

// :machine = id
router.get('/machine/:machine', function(req, res, next) {

    var machine = req.machine;

    Machine.find(function(err) {
        if (err) {
            res.sendStatus(404);
            return next(err);
        }
        var r = res.send(machine);
        console.log(r.data);

        return next();
    });

});

/**
 * Edit Machine
 */

router.put('/machine/:id', function (req, res) {
    Machine.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, doc) {
        if (err) console.log(err);
        console.log("Objeto atualizado!");
        res.send(doc);
    });
});

router.delete('/machine/:machine', function(req, res, next) {

    Machine.remove({_id: req.params.machine}, function(err) {
        if (err) {
            res.sendStatus(404);

            return next(err);
        }
        res.end();

        return next();
    });

});


router.param('machine', function (req, res, next, _id) {
    var query = Machine.findById(_id);

    query.exec(function (err, machine) {
        if (err) {
            res.sendStatus(code404);
            return next(err);
        }
        if (!machine) {
            res.sendStatus(code404);
            return next(new Error('can\'t find machine'));
        }

        req.machine = machine;
        return next();
    });
});



module.exports = router;
