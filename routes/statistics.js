var express = require('express'),
	router = express.Router(),
	endpointBase = 'http://localhost:8080/api/v1/statistics/',
	najax = require('najax'),
	async = require('async');

/* GET home page. */
router.get('/', function(req, res) {
  var mostLikedCampaigns,
  	  mostRecentCampaigns;

  async.series([
  		function(callback) {
  			var queryParams = req.query;
  			najax({ url: endpointBase + '/gettopcampaigns?type=' + queryParams, type: 'GET' })
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