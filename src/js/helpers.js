 /*jshint unused:false*/
var helpers = (function() {
  var module = {};

  module.getParameterByName = function(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  module.getPageName = function() {
    return window.location.pathname.substring(1);
  };

  return module;
})();
 /*jshint unused:false*/
