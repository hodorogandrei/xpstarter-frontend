var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax');

console.log(__dirname);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
  	pageTitle: 'XPress Starter - Crowd funding for civic projects'
  });
});

router.get('/statistics', function (req, res) {
	res.render('statistics', {
		pageTitle: 'XPress Starter - Campaign Statistics',
		path: 'statistics'
	});
});

module.exports = router;