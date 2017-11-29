var express = require('express');
var router = express.Router();


var Room = require("../models/room");
var fs = require('fs');
var path = require('path');

router.post('/room', function (req, res) {
    
    var room = new Room(req.body);
        room.save(function (err, next) {
          	if (err) {
            	return next(err);
           	}
          res.end()
     	});
    
});

router.get('/rooms', function (req, res) {

    Room.find(function (err, room) {
            if (err) return console.error(err);
            res.send(room);
        });
    
});

// :room = id
router.get('/room/:room', function(req, res, next) {
    
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

router.post('/room', function (req, res) {
    
    var roomID = req.body.room;
      Room.find({room: roomID}, function (err, room) {
            if (err) return console.error(err);
            res.send(room);
        });
    
});

router.delete('/room/:room', function(req, res, next) {
    
  Room.remove({_id: req.params.room}, function(err) {
    if (err) {
      res.sendStatus(404);

       return next(err);
    }
    res.end();

    return next();
  });
    
});


router.param('room', function (req, res, next, _id) {
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