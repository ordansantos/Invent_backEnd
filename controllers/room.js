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



module.exports = router;