var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax');

console.log(__dirname);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XPressStarter - Crowd funding for civic projects' });
});

module.exports = router;