var requestHandlers = (function() {
	var module = {};

	var updateQueryStringParameter = function (uri, key, value) {
		var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
		var separator = uri.indexOf('?') !== -1 ? "&" : "?";
		if (uri.match(re)) {
			return uri.replace(re, '$1' + key + "=" + value + '$2');
		}
		else {
			return uri + separator + key + "=" + value;
		}
	};

	module.searchCampaigns = function() {
		var categoryIcons = {}
	    categoryIcons['SPORTS'] = 'mdi-bike'
	    categoryIcons['PARKS'] = 'mdi-leaf'
	    categoryIcons['ARTS'] = 'mdi-brush'
	    categoryIcons['BUILDINGS'] = 'mdi-home'
	    categoryIcons['FOOD'] = 'mdi-food-apple'
	    categoryIcons['INFRASTRUCTURE'] = 'mdi-car'

		$('[data-type="search-campaigns"]').on('keydown', function() {
			var searchQuery = $(this).val();

			if(searchQuery.length >= 3) {
				$.ajax({
					url: '/search/' + searchQuery + '?autocomplete=true',
					type: 'GET',
					success: function(data) {
						if(data.campaigns.length > 0) {
							$('.outputbox').css( { 'display': 'block' } )
							$('.outputbox').empty();

							for (var i = 0; i < data.campaigns.length; i++) {
								$('.outputbox').append(
									'<div class="autorow text-md"><a href="' + data.campaigns[i].campaignLink + '">' + data.campaigns[i].name + ' <span class="text-right ' + data.campaigns[i].category + ' mdi ' + categoryIcons[data.campaigns[i].category] + '"></span> ' + data.campaigns[i].category + '' +  '</a></div>'
								);
							}
						}
					}
				});
			} else {
				$('.outputbox').css( { 'display': 'none' } );
			}
		});

		$('[data-button="search-button"]').on('click', function() {
			var searchQuery = $(this).parents('.input-group').find('.search-query').val();
			$.ajax({
				url: '/search/' + searchQuery,
				type: 'GET'
			});
			window.location.href = '/search/' + searchQuery;
		});
	};

	module.campaignCategories = function() {
		$('[data-type="select-sort"]').on('change', function() {
			var sortCriteria = $(this).val();

			redirectUrl = updateQueryStringParameter(document.location.href, "sort", sortCriteria);
			redirectUrl = updateQueryStringParameter(redirectUrl, "page", 0);
			window.location.href = redirectUrl;
		});

		$('[data-type="select-perpage"]').on('change', function() {
			var size = $(this).val();

			redirectUrl = updateQueryStringParameter(document.location.href, "size", size);
			redirectUrl = updateQueryStringParameter(redirectUrl, "page", 0);
			window.location.href = redirectUrl;
		});

		if(document.location.pathname.split('/')[1] === 'search') {
			$('[data-type="search-campaigns"]').val(document.location.pathname.split('/')[2]);
		}
	};

	return module;
})();

requestHandlers.searchCampaigns();
requestHandlers.campaignCategories();