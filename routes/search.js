var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax'),
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

// Search campaigns
router.get('/:searchQuery', function(req, res, next) {
	console.log(req.path);
	var searchQuery = req.params.searchQuery,
		url = endpointBase + '/campaigns/search/findByNameContainingOrDescriptionContainingAllIgnoreCase?keyword=' + searchQuery,
		queryParams = req.query,
		title = 'XPress Starter';

	if(queryParams.autocomplete) {
		najax({ url: url, type: 'GET' }).success(function(responseObject) {
			responseObject = JSON.parse(responseObject);
	      	linkifyCampaign(responseObject, req);

	      	// for (var i = 0; i < responseObject_embedded.campaigns.length; i++) {
	      	// 	responseObject_embedded.campaigns[i] = {
	      	// 		title: responseObject_embedded.campaigns.name,
	      	// 		link: responseObject._embedded.campaignLink
	      	// 	}
	      	// }

			res.send({ campaigns: responseObject._embedded.campaigns });
		});
	} else {
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

		najax({ url: url, type: 'GET' }).success(function(responseObject) {
	      	responseObject = JSON.parse(responseObject);
	      	linkifyCampaign(responseObject, req);

			res.render('campaigns', {
				pageTitle: title,
				campaigns: responseObject._embedded.campaigns,
				path: req.baseUrl + req.path,
				currentPage: parseInt(queryParams.page, 10),
				totalPages: parseInt(responseObject.page.totalPages, 10),
				searchQuery: searchQuery,
				queryParams: req.query
			});
		});
	}
});

module.exports = router;
