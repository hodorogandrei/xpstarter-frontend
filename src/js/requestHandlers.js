// var endpointBase = 'http://localhost:8080/api/v1/';

// var requestHandlers = (function() {
// 	var module = {};

// 	module.getCampaigns = function(id) {
// 		var url = endpointBase + '/campaigns/'

// 		if(id) {
// 			url += 'id';
// 		}

// 		jQuery.extend({
// 		    getValues: function(url) {
// 		        var result = null;
// 		        $.ajax({
// 		            url: url,
// 		            type: 'get',
// 		            dataType: 'json',
// 		            async: false,
// 		            success: function(data) {
// 		                result = data;
// 		            }
// 		        });
// 		       return result;
// 		    }
// 		});

// 		const allData = $.getValues(url);
// 		return allData;
// 	}
// })();