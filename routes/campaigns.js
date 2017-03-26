var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax');

console.log(__dirname);

/* GET campaign pages. */

// All campaigns
router.get('/', function(req, res, next) {
	var url = endpointBase + '/campaigns/';

	najax({ url: url, type: 'GET' })
		.success(function(data) {
			res.render('campaigns', {campaigns: JSON.parse(data)._embedded.campaigns });
		});
});

// Campaigns from one category
router.get('/:category', function(req, res, next) {
	var categoryURLFormat = req.params.category,
		categoryMapping = {
			'arts-and-culture': 'ARTS',
			'sports-and-play': 'SPORTS',
			'parks-and-gardens': 'PARKS',
			'buildings': 'BUILDINGS',
			'food': 'FOOD',
			'infrastructure': 'INFRASTRUCTURE'
		},
		categoryServerRequest = categoryMapping[categoryURLFormat],
		url = endpointBase + '/campaigns/search/findByCategory?category=' + categoryServerRequest;

	najax({ url: url, type: 'GET' })
		.success(function(data) {
			res.render('campaigns', {campaigns: JSON.parse(data)._embedded.campaigns });
		});
});

module.exports = router;
