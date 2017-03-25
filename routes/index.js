var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	http = require('http'),
	request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XPressStarter - Crowd funding for civic projects' });
});

/* GET campaign pages. */

// All campaigns
router.get('/campaigns/:id?', function(req, res, next) {
	var id = req.params.id,
		externalRes,
		uri = endpointBase + 'campaigns/';

	if(id) {
		uri += id;
	}
	console.log(uri);
	request({
	    url: uri,
	}, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				body = JSON.parse(body)._embedded.campaigns;
				body = JSON.stringify(body);
				res.render('artsandculture', {campaigns: JSON.parse(body) });
			} else {
				res.json(error);
			}
		}
	);
	// .pipe(externalRes);
	// res.json(externalRes);

	// var proxyRequest = http.request({
	// 	host: 'localhost',
	// 	port: 8080,
	// 	method: 'GET',
	// 	path: uri
	// },
	// function (proxyResponse) {
	// 	proxyResponse.on('data', function(data) {
	// 		res.send(data);
	// 	});
	// });

	// proxyRequest.write(res.body);
	// proxyRequest.end();


});

router.get('/arts-and-culture', function(req, res, next) {
  res.render('artsandculture');
});

module.exports = router;
