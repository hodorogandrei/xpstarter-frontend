var init = (function() {
  var module = {};

  module.initApp = function() {
    if(helpers.getPageName() === '') {
    	console.log('home');
    }
  };

  return module;
})();

init.initApp();