var stats = (function() {
  var module = {};

  module.initGraph = function() {
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: [
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
        ],
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

    var chart2 = c3.generate({
      bindto: '#chart2',
      data: {
        columns: [
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
        ],
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

  return module;
})();