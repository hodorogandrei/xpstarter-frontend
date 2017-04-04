var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax');
/* GET campaign pages. */

// All campaigns
router.get('/', function(req, res, next) {
	var url = endpointBase + '/campaigns?',
      queryParams = req.query,
    	title = 'XPress Starter - All campaigns';

	if(Object.keys(queryParams).length !== 0) {
		if(queryParams.size) {
		  url += '&size=' + queryParams.size;
		}

		if(queryParams.page) {
		  url += '&page=' + queryParams.page;
		}

		if(queryParams.sort) {
		  url += '&sort=' + queryParams.sort;
		}
	}

	najax({ url: url, type: 'GET' })
		.success(function(responseObject) {
		  responseObject = JSON.parse(responseObject);
			res.render('campaigns', {
				pageTitle: title,
				campaigns: responseObject._embedded.campaigns,
				path: 'campaigns',
				currentPage: parseInt(queryParams.page, 10),
				totalPages: parseInt(responseObject.page.totalPages, 10)
			});
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
		queryParams = req.query,
    title = 'XPress Starter';

	if(Object.keys(queryParams).length !== 0) {
		if(queryParams.size) {
			url += '&size=' + queryParams.size;
		}

	    if(queryParams.page) {
	      url += '&page=' + queryParams.page;
	    }

	    if(queryParams.sort) {
	      url += '&sort=' + queryParams.sort;
	    }
	}

  	title += ' - ' + categoryServerRequest + ' campaigns';
	najax({ url: url, type: 'GET' })
		.success(function(responseObject) {
      	responseObject = JSON.parse(responseObject);
		res.render('campaigns', {
			pageTitle: title,
			campaigns: responseObject._embedded.campaigns,
			path: req.path,
			currentPage: parseInt(queryParams.page, 10),
			totalPages: parseInt(responseObject.page.totalPages, 10)
		});
	});
});

// Search campaigns
router.get('/search/:searchQuery', function(req, res, next) {
	var searchQuery = req.params.searchQuery,
		url = endpointBase + '/campaigns/search/findByNameContainingOrDescriptionContainingAllIgnoreCase?keyword=' + searchQuery,
		queryParams = req.query,
		title = 'XPress Starter';

	title += ' - Campaigns containing "' + searchQuery + '"';
	if(Object.keys(queryParams).length !== 0) {
		if(queryParams.size) {
			url += '&size=' + queryParams.size;
		}

	    if(queryParams.page) {
	      url += '&page=' + queryParams.page;
	    }

	    if(queryParams.sort) {
	      url += '&sort=' + queryParams.sort;
	    }
	}

	najax({ url: url, type: 'GET' })
		.success(function(responseObject) {
      	responseObject = JSON.parse(responseObject);
		res.render('campaigns', {
			pageTitle: title,
			campaigns: responseObject._embedded.campaigns,
			path: req.path,
			currentPage: parseInt(queryParams.page, 10),
			totalPages: parseInt(responseObject.page.totalPages, 10)
		});
	});
});

module.exports = router;
