var express = require('express');
var router = express.Router();


var Room = require("../models/room");
var fs = require('fs');
var path = require('path');

var auth = require('./auth');

router.post('/room', auth.getAuth(), function (req, res) {
    
    var room = new Room(req.body);
        room.save(function (err, next) {
          	if (err) {
            	return next(err);
           	}
          res.end()
     	});
    
});

router.get('/rooms', auth.getAuth(), function (req, res) {

    Room.find(function (err, room) {
            if (err) return console.error(err);
            res.send(room);
        });
    
});

// :room = id
router.get('/room/:room', auth.getAuth(), function(req, res, next) {
    
  var room = req.room;

  Room.find(function(err) {
    if (err) {
      res.sendStatus(404);
      return next(err);
    }
      var r = res.send(room);
      console.log(r.data);

      return next();
  });
  
});


/**
 * Edit Machine
 */

router.put('/room/:id', function (req, res) {
    Room.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, doc) {
        if (err) console.log(err);
        console.log("Objeto atualizado!");
        res.send(doc);
    });
});

router.post('/room', auth.getAuth(), function (req, res) {
   
    var roomID = req.body.room;
      Room.find({room: roomID}, function (err, room) {
            if (err) return console.error(err);
            res.send(room);
        });
    
});

router.delete('/room/:room', auth.getAuth(), function(req, res, next) {
    
  Room.remove({_id: req.params.room}, function(err) {
    if (err) {
      res.sendStatus(404);

       return next(err);
    }
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