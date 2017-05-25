var stats = (function() {
  var module = {};

  module.initGraphs = function() {
    stats.initTopCampaigns();
    stats.initNearlyFunded();
    stats.initAvgDonation();
    stats.initCircles();
  };

  module.initTopCampaigns = function() {
    var objFromBack = [
      [
        "Abundance at Edible York",
        48717.75
      ],
      [
        "Catford South Kids' Lantern Parade",
        47683.24
      ],
      [
        "Wanstead Playground Phase 1",
        47450.18
      ],
      [
        "Shuffle Reinvents The Lodge",
        47357.15
      ],
      [
        "Bring the #AdpRiotTour to Macc!",
        47268.41
      ],
      [
        "Fibre for the Truman",
        47137.07
      ],
      [
        "UK's first Sustainable Department Store",
        46919.05
      ],
      [
        "Croydon Saffron Central",
        46894.92
      ],
      [
        "South Norwood Lake Playground",
        46599.65
      ],
      [
        "Park and Slide",
        46382.97
      ]
    ];

    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: objFromBack,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      }
    });
  };

  module.initNearlyFunded = function() {
      var objFromBack = [
      [
        "The Eel Pie Island Museum",
        97.43
      ],
      [
        "The Berry Maze",
        96.76
      ],
      [
        "Hello Hoxton High Street",
        92.22
      ],
      [
        "Recipes for food and architecture",
        91.64
      ],
      [
        "Light Up Acomb This Christmas",
        89.76
      ],
      [
        "Melting Pot @ London Sculpture Workshop",
        88.33
      ],
      [
        "The Renovation of Wanstead Playground 2",
        88.2
      ],
      [
        "York Arts Barge",
        87.78
      ],
      [
        "From Musician to Nutrition",
        82.89
      ],
      [
        "South Norwood Lake Playground",
        79.09
      ]
    ];

    var chart2 = c3.generate({
      bindto: '#chart2',
      data: {
        columns: objFromBack,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      }
    });
  };


  module.initAvgDonation = function() {
    var objFromBack = [
      [
        "ARTS",
        50.15555452522254
      ],
      [
        "SPORTS",
        50.19941079112876
      ],
      [
        "PARKS",
        49.851576673866084
      ],
      [
        "BUILDINGS",
        50.298034671188994
      ],
      [
        "FOOD",
        49.915915085236406
      ],
      [
        "INFRASTRUCTURE",
        50.15932728479751
      ]
    ];

    var chart3 = c3.generate({
      bindto: '#chart3',
      data: {
        columns: objFromBack,
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
      }
    });
  };

  module.initTopDonatingUsers = function() {
    console.log('test');
  };

  module.initCircles = function() {
    var initIndividualCircle = function(container, percentage) {
      var colors = {
          'pink': '#E1499A',
          'yellow': '#f0ff08',
          'green': '#47e495'
      };

      var color = colors.pink;

      var radius = 100;
      var border = 5;
      var padding = 30;
      var startPercent = 0;
      var endPercent = percentage;


      var twoPi = Math.PI * 2;
      var formatPercent = d3.format('.0%');
      var boxSize = (radius + padding) * 2;


      var count = Math.abs((endPercent - startPercent) / 0.01);
      var step = endPercent < startPercent ? -0.01 : 0.01;

      var arc = d3.svg.arc()
          .startAngle(0)
          .innerRadius(radius)
          .outerRadius(radius - border);

      var parent = d3.select(container);

      var svg = parent.append('svg')
          .attr('width', boxSize)
          .attr('height', boxSize);

      var defs = svg.append('defs');

      var filter = defs.append('filter')
          .attr('id', 'blur');

      filter.append('feGaussianBlur')
          .attr('in', 'SourceGraphic')
          .attr('stdDeviation', '7');

      var g = svg.append('g')
          .attr('transform', 'translate(' + boxSize / 2 + ',' + boxSize / 2 + ')');

      var meter = g.append('g')
          .attr('class', 'progress-meter');

      meter.append('path')
          .attr('class', 'background')
          .attr('fill', '#ccc')
          .attr('fill-opacity', 0.5)
          .attr('d', arc.endAngle(twoPi));

      var foreground = meter.append('path')
          .attr('class', 'foreground')
          .attr('fill', color)
          .attr('fill-opacity', 1)
          .attr('stroke', color)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', 1)
          .attr('filter', 'url(#blur)');

      var front = meter.append('path')
          .attr('class', 'foreground')
          .attr('fill', color)
          .attr('fill-opacity', 1);

      var numberText = meter.append('text')
          .attr('fill', '#000')
          .attr('text-anchor', 'middle')
          .attr('dy', '.35em');

      function updateProgress(progress) {
          foreground.attr('d', arc.endAngle(twoPi * progress));
          front.attr('d', arc.endAngle(twoPi * progress));
          numberText.text(formatPercent(progress));
      }

      var progress = startPercent;

      (function loops() {
          updateProgress(progress);

          if (count > 0) {
              count--;
              progress += step;
              setTimeout(loops, 10);
          }
      })();
    };

    initIndividualCircle('#arts', 0.30333);
    initIndividualCircle('#sports', 0.40);
    initIndividualCircle('#parks', 0.50);
    initIndividualCircle('#buildings', 0.60);
    initIndividualCircle('#food', 0.70);
    initIndividualCircle('#infrastructure', 0.80);
  };

  return module;
})();