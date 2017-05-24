var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax'),
	async = require('async'),
	categoryMapping = {
		'arts-and-culture': 'ARTS',
		'sports-and-play': 'SPORTS',
		'parks-and-gardens': 'PARKS',
		'buildings': 'BUILDINGS',
		'food': 'FOOD',
		'infrastructure': 'INFRASTRUCTURE'
	},
	categoryMappingSecond = {
		'ARTS': 'arts-and-culture',
		'SPORTS': 'sports-and-play',
		'PARKS': 'parks-and-gardens',
		'BUILDINGS': 'buildings',
		'FOOD': 'food',
		'INFRASTRUCTURE': 'infrastructure'
	};
/* GET campaign pages. */

// Campaigns from root or one category
router.get('/:category?', function(req, res, next) {
	var queryParams = req.query,
    	title = 'XPress Starter';
	if(req.params.category) {
		var categoryURLFormat = req.params.category,
			categoryServerRequest = categoryMapping[categoryURLFormat],
			url = endpointBase + '/campaigns/search/findByCategory?category=' + categoryServerRequest;
		title += ' - ' + categoryServerRequest + ' campaigns';

	} else {
		url = endpointBase + '/campaigns?';
		title += ' - All campaigns';
	}

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

	najax({ url: url, type: 'GET' }).success(function(responseObject) {
      	responseObject = JSON.parse(responseObject);

      	for (var i = 0; i < responseObject._embedded.campaigns.length; i++) {
      		var urlLink = responseObject._embedded.campaigns[i]._links.self.href;
	      	urlLink = urlLink.substr(urlLink.lastIndexOf('/') + 1);
	      	responseObject._embedded.campaigns[i].campaignLink = req.protocol + '://' + req.get('host') + '/campaigns/' + categoryMappingSecond[responseObject._embedded.campaigns[i].category] + '/' + urlLink;
      	}

		res.render('campaigns', {
			pageTitle: title,
			campaigns: responseObject._embedded.campaigns,
			path: req.baseUrl + req.path,
			currentPage: parseInt(queryParams.page, 10),
			totalPages: parseInt(responseObject.page.totalPages, 10)
		});
	});
});

// Individual campaign
router.get('/:category/:campaignId', function(req, res, next) {
	var queryParams = req.query,
    	title = 'XPress Starter - ',
    	url = endpointBase + '/campaigns/' + req.params.campaignId,
    	urlDonations = endpointBase + '/donations/search/findByCampaignId?campaignid=' + req.params.campaignId;

    async.series([
    		function(callback) {
				najax({ url: url, type: 'GET' })
				.success(function(responseObject) {
		      		responseObject = JSON.parse(responseObject);
		      		title = title + responseObject.name;
		      		callback(null, responseObject);
		      	});
    		},
    		function(callback) {
    			najax({ url: urlDonations, type: 'GET' })
				.success(function(responseObject) {
		      		responseObject = JSON.parse(responseObject);
		      		callback(null, responseObject);
		      	});
    		}
		], function(err, results) {
			res.render('campaign', {
				pageTitle: title,
				campaign: results[0],
				usersDonated: results[1]._embedded.donations
			});
		});


});

module.exports = router;
