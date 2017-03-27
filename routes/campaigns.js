var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax');

/* GET campaign pages. */

// All campaigns
router.get('/', function(req, res, next) {
	var url = endpointBase + '/campaigns/';

	najax({ url: url, type: 'GET' })
		.success(function(data) {
			res.render('campaigns', {campaigns: JSON.parse(data)._embedded.campaigns, path: 'campaigns' });
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
		url = endpointBase + '/campaigns/search/findByCategory?category=' + categoryServerRequest,
		requestPath = req.path,
		queryParams = req.query;

	if(Object.keys(queryParams).length !== 0) {
		if(queryParams.size) {
			url += '&size=' + queryParams.size;
		}

    if(queryParams.page) {
      url += '&page=' + queryParams.page;
    }
	}

	console.log(url);

	najax({ url: url, type: 'GET' })
		.success(function(data) {
			res.render('campaigns', {campaigns: JSON.parse(data)._embedded.campaigns, path: req.path });
		});
});

module.exports = router;
