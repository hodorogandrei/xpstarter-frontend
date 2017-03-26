 /*jshint unused:false*/
var formatters = (function() {
  var module = {};

  module.formatDates = function() {
    $('[data-type="iso-date"]').each(function() {
      if($(this).data('item') === 'campaign-date') {
        var isoDate = $(this).data('original-date');
        $(this).text(moment(isoDate).format('ddd MMM YY hh:mm'));
      }
    });
  };

  module.calculateTimeLeft = function() {
    var updateTimeLeft = function() {
      $('[data-item="campaign"]').each(function() {
        var endTime = moment($(this).find('[data-datetype="finish"]').data('original-date')),
            now = moment(new Date()),
            duration = moment.duration(endTime.diff(now)),
            fullDuration = duration.get('days') + ' days, ' + duration.get('hours') + ' hours, ' + duration.get('minutes') + ' minutes, ' + duration.get('seconds') + ' seconds';

        $(this).find('[data-item="time-left"]').first().text(fullDuration);

      });
    };
    updateTimeLeft();
    setInterval(updateTimeLeft, 1000);
  };

  return module;
})();
 /*jshint unused:false*/

 formatters.formatDates();
 formatters.calculateTimeLeft();
