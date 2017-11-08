var express = require('express')
var router = express.Router();

router.use('/', require('./login'))

router.use('/', require('./user'))

router.use('/', require('./machine'))




router.get('/', function (req, res) {
	res.send('<h1>\\\\\\Invent</h1><h4>Lorem ipsum dolor.</h4>');
});

module.exports = router
