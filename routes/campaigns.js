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

var linkifyCampaign = function(responseObject, req) {
	for (var i = 0; i < responseObject._embedded.campaigns.length; i++) {
  		var urlLink = responseObject._embedded.campaigns[i]._links.self.href;
      	urlLink = urlLink.substr(urlLink.lastIndexOf('/') + 1);
      	responseObject._embedded.campaigns[i].campaignLink = req.protocol + '://' + req.get('host') + '/campaigns/' + categoryMappingSecond[responseObject._embedded.campaigns[i].category] + '/' + urlLink;
  	}

  	return responseObject;
}

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
      	linkifyCampaign(responseObject, req);

		res.render('campaigns', {
			pageTitle: title,
			campaigns: responseObject._embedded.campaigns,
			path: req.baseUrl + req.path,
			currentPage: parseInt(queryParams.page, 10),
			totalPages: parseInt(responseObject.page.totalPages, 10),
			queryParams: req.query
		});
	});
});

// Individual campaign
router.get('/:category/:campaignId', function(req, res, next) {
	var queryParams = req.query,
    	title = 'XPress Starter - ',
    	url = endpointBase + '/campaigns/' + req.params.campaignId,
    	urlDonations = endpointBase + '/donations/search/findByCampaignId?campaignid=' + req.params.campaignId,
    	campaignCategory;

    async.series([
    	function(callback) {
			najax({ url: url, type: 'GET'})
			.success(function(responseObject) {
				responseObject = JSON.parse(responseObject);
				campaignCategory = responseObject.category;
				callback(null, campaignCategory);
			});
    	}
	], function(err, results) {
		campaignCategory = results[0];
		var urlSimilar = endpointBase + '/campaigns/search/findByCategory?category=' + campaignCategory + '&size=3&page=2';

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
			,
			function(callback) {
				najax({ url: urlSimilar, type: 'GET' })
				.success(function(responseObject) {
					responseObject = JSON.parse(responseObject);
					callback(null, responseObject);
				});
			}
		], function(err, results) {
			console.log(JSON.stringify(results[1]._embedded.donations));
			res.render('campaign', {
				pageTitle: title,
				campaign: results[0],
				usersDonated: results[1]._embedded.donations,
				similarCampaigns: results[2]._embedded.campaigns,
				queryParams: req.query
			});
		});
	});
});

module.exports = router;
