var express = require('express');
var router = express.Router();


var User = require("../models/user");
var fs = require('fs');
var path = require('path');

var auth = require('./auth');

router.post('/user', auth.getAuth(), function (req, res) {

    var user = new User(req.body);
        user.save(function (err, next) {
            if (err) {
              return next(err);
            }
          res.end()
      });

});

router.get('/users', auth.getAuth(), function (req, res) {

    User.find(function (err, user) {
            if (err) return console.error(err);
            res.send(user);
        });

});

// :user = id
router.get('/user/:user', auth.getAuth(), function(req, res, next) {

  var user = req.user;

  User.find(function(err) {
    if (err) {
      res.sendStatus(404);
      return next(err);
    }
      var r = res.send(user);

      return next();
  });

});

router.delete('/user/:user', auth.getAuth(), function(req, res, next) {

  User.remove({_id: req.params.user}, function(err) {
    if (err) {
      res.sendStatus(404);

       return next(err);
    }
    res.end();

    return next();
  });

});

/**
 * Edit Thing
 */

router.put('/user/:id', auth.getAuth(), function (req, res) {
  console.log(req.body);
  User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function (err, doc) {
      if (err) console.log(err);
      console.log("Usuário atualizado!");
      res.send(doc);
    });
});



router.param('user', auth.getAuth(), function (req, res, next, _id) {
  var query = User.findById(_id);

  query.exec(function (err, user) {
    if (err) {
      res.sendStatus(code404);
      return next(err);
    }
    if (!user) {
      res.sendStatus(code404);
      return next(new Error('can\'t find user'));
    }

    req.user = user;
    return next();
  });
});



module.exports = router;
