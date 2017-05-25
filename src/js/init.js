var init = (function() {
  var module = {};

  module.initApp = function() {
    if(helpers.getPageName() === '') {
    	console.log('home');
    }

    if(helpers.getPageName() === 'statistics') {
      stats.initGraphs();
    }
  };

  return module;
})();

init.initApp();