var requestHandlers = (function() {
	var module = {};

	module.searchCampaigns = function() {
		$('[data-button="search-button"]').on('click', function() {
			var searchQuery = $(this).parents('.input-group').find('.search-query').val();
			$.ajax({
				url: '/campaigns/search/' + searchQuery,
				type: 'GET'
			});
			window.location.href = '/campaigns/search/' + searchQuery;
		});
	};

	return module;
})();

requestHandlers.searchCampaigns();