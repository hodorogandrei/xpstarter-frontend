var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/',
	najax = require('najax'),
	async = require('async'),
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

/* GET home page. */
router.get('/', function(req, res) {
  var mostLikedCampaigns,
  	  mostRecentCampaigns;

  async.series([
  		function(callback) {
  			najax({ url: endpointBase + '/campaigns?sort=likeCount,desc&size=4', type: 'GET' })
		  	.success(function(responseObject) {
		  		responseObject = JSON.parse(responseObject);
		  		linkifyCampaign(responseObject, req);
		  		mostLikedCampaigns = responseObject._embedded.campaigns;
		  		callback(null, mostLikedCampaigns);
		  	});
  		},
  		function(callback) {
  			najax({ url: endpointBase + '/campaigns?sort=startedOn,desc&size=4', type: 'GET' })
		  	.success(function(responseObject) {
		  		responseObject = JSON.parse(responseObject);
		  		linkifyCampaign(responseObject, req);
		  		mostRecentCampaigns = responseObject._embedded.campaigns;
		  		callback(null, mostRecentCampaigns);
		  	});
  		}
  	], function(err, results) {
		res.render('index', {
			pageTitle: 'XPress Starter - Crowd funding for civic projects',
			mostLikedCampaigns: results[0],
			mostRecentCampaigns: results[1]
		});
  	});
});

router.get('/statistics', function (req, res) {
	res.render('statistics', {
		pageTitle: 'XPress Starter - Campaign Statistics',
		path: 'statistics'
	});
});

module.exports = router;