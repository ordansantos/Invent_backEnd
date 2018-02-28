var express = require('express');
var router = express.Router();


var Room = require("../models/room");
var fs = require('fs');
var path = require('path');

var auth = require('./auth');

router.post('/room', auth.getAuth(), auth.checkRole, function (req, res) {
    
    var room = new Room(req.body);
        room.save(function (err, next) {
          	if (err) {
            	return console.error(err);
           	}
          res.status(200);
          res.end()

     	});
    
});

router.get('/rooms', auth.getAuth(), function (req, res) {

    Room.find(function (err, room) {
            if (err) return console.error(err);
            res.status(200);
            res.send(room);
        });
    
});

// :room = id
router.get('/room/:room', auth.getAuth(), function(req, res, next) {
    
  var room = req.room;

  Room.findOne({_id: req.params.room}, function(err, room) {
    if (err) {
      res.sendStatus(404);
      return next(err);
    }
      var r = res.send(room);
      console.log(r.data);
      res.status(200);
      return next();
  });
  
});


/**
 * Edit Machine
 */

router.put('/room/:id', auth.getAuth(), auth.checkRole, function (req, res) {
    Room.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, doc) {
        if (err) console.log(err);
        console.log("Objeto atualizado!");
        res.status(200);
        res.send(doc);
    });
});

router.post('/room', auth.getAuth(), auth.checkRole, function (req, res) {
   
    var roomID = req.body.room;
      Room.find({room: roomID}, function (err, room) {
            if (err) return console.error(err);
            res.status(200);
            res.send(room);
        });
    
});

router.delete('/room/:room', auth.getAuth(), auth.checkRole, function(req, res, next) {
    
  Room.remove({_id: req.params.room}, function(err) {
    if (err) {
      res.sendStatus(404);

       return next(err);
    }
    res.status(200);
    res.end();

    return next();
  });
    
});


router.param('room', auth.getAuth(), function (req, res, next, _id) {
  var query = Room.findById(_id);

  query.exec(function (err, room) {
    if (err) {
      res.sendStatus(code404);
      return next(err);
    }
    if (!room) {
      res.sendStatus(code404);
      return next(new Error('can\'t find room'));
    }

    req.room = room;
    return next();
  });
});



module.exports = router;