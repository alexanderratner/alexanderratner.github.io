$(function(){

  var CUISINES = [
    {
      type: 'Bagel',
      dataDir: 'the-20-best-bagels-in-new-york-ranked',
      image: 'bagel.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Chicken and Waffles',
      dataDir: 'best-chicken-and-waffles-in-nyc',
      image: 'chickenwaffles.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Coffee',
      dataDir: 'best-coffee-shops-in-new-york',
      image: 'coffee.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Deli',
      dataDir: 'best-new-york-delis',
      image: 'deli.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Donut',
      dataDir: 'best-donut-shops-in-new-york-city',
      image: 'donut.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Nachos',
      dataDir: 'best-nachos-in-nyc',
      image: 'nachos.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Ramen',
      dataDir: 'best-ramen-in-nyc',
      image: 'ramen.jpg',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    },

    {
      type: 'Sandwich',
      image: 'sandwich.jpg',
      dataDir: 'the-best-sandwich-shops-in-nyc',
      description: 'Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.'
    }

  ];
  var URL = 'https://www.timeout.com/newyork/restaurants/';
  var PROXY_URL = 'https://accesscontrolalloworiginall.herokuapp.com/';
  var directory;
  var speacialty;
  var styles = {
    default: null,
    silver: [
      {
        elementType: 'geometry',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [{color: '#f5f5f5'}]
      },
      {
        featureType: 'administrative.land_parcel',
        elementType: 'labels.text.fill',
        stylers: [{color: '#bdbdbd'}]
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [{color: '#757575'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#dadada'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#616161'}]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      },
      {
        featureType: 'transit.line',
        elementType: 'geometry',
        stylers: [{color: '#e5e5e5'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'geometry',
        stylers: [{color: '#eeeeee'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#c9c9c9'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9e9e9e'}]
      }
    ]
  };
  var map;
  var infowindow;
  var userMarker;

  var Utils = {
    getSourcesMarkup: function(sources) {
      var sourceMarkupArray = _.map(sources, function(source) {
        return Utils.getSingleSourceMarkup(source);
      });
      return sourceMarkupArray.join('');
    },
    getSingleSourceMarkup: function(source) {
      return Utils.sourceListTemplate(source);
    },
    sourceListTemplate: _.template(
      '<div class="col-md-6">' +
        '<img src="img/<%= image %>" alt="<%= dataDir %>" data-id="<%= type %>" />' +
        '<h3>Best <%= type %> Near You</h3>' +
        '<p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>' +
        '<p><a class="btn btn-default" href="#" role="button">Search food &raquo;</a></p>' +
      '</div>'
    ),
    //menu list
    getMenuMarkup: function(menus) {
      var menuMarkupArray = _.map(menus, function(menu) {
        return Utils.getSingleMenuMarkup(menu);
      });
      return menuMarkupArray.join('');
    },
    getSingleMenuMarkup: function(menu) {
      return Utils.menuListTemplate(menu);
    },
    menuListTemplate: _.template(
      '<a href="#"><li class="<%= type %>" data-id="<%= dataDir %>"><%= type %></li></a>'
    )

  };

  var App = {

    init: function(){
      App.listSources(CUISINES);
      App.listMenu(CUISINES);
      App.bindEvents();
    },

    bindEvents: function() {
      $('.intro-screen').on('click', '.btn', function(){
        directory = $(this).parent().siblings('img').attr('alt');
        speacialty = $(this).parent().siblings('img').attr('data-id');
        $('.loader').css('display', 'flex');
        App.scrapeFoodReturn();
      });

      $('.dropdown-burger').on('click', 'a li', function(){
        directory = $(this).attr('data-id');
        speacialty = $(this).attr('class');
        $('.dropdown-burger').css('display', 'none');
        $('.loader').css('display', 'flex');
        App.scrapeFoodReturn();
      });

      $('.burger').on('click', function(){
        $('.dropdown-burger').css('display', 'block');
      });

      $('.dropdown-burger a img').on('click', function(){
        $('.dropdown-burger').css('display', 'none');
      });

      $('a .burger').on({
        mouseenter: function () {
          $('a .burger g g path').attr('fill', '#FCCB30');
        },
        mouseleave: function () {
          $('a .burger g g path').attr('fill', '#FFF');
        }
      });
    },

    listSources: function(source) {
      var sourcesMarkup = Utils.getSourcesMarkup(source);
      $(".intro-screen .container .row").html(sourcesMarkup);
    },

    listMenu: function(menu) {
      var menuMarkup = Utils.getMenuMarkup(menu);
      $(".dropdown-burger ul").html(menuMarkup);
    },

    scrapeFoodRequest: function(){
      return $.ajax({
        url: PROXY_URL + URL + directory,
        dataType: 'html'
      });
    },

    scrapeFoodReturn: function(){
      var request = App.scrapeFoodRequest();
      request.done(function() {
        var resp = request.responseText;
        var html = $.parseHTML(resp);
        // console.log(html);

        var el = $( '<div></div>' );
        el.html(html);

        var titles = $('.feature-item__column h3 a', el);
        var titlesList = _.pluck(titles, 'innerText');
        titlesList.pop();
        // console.log(titlesList);

        var loc = $('.listings_flag.icon.icon_pin', el);
        var locList = _.pluck(loc, 'innerText');
        var locList = _.map(locList, function(v) {
          return v.slice(13, -9);
        });
        // console.log(locList);

        var titleLocList = titlesList.map(function (num, idx) {
          return num + " " + locList[idx];
        });
        console.log(titleLocList);

        App.initMap(titleLocList);
      });
    },

    initMap: function(list) {
      var home = {lat: 40.6357511, lng: -73.9596188};
      map = new google.maps.Map(document.getElementById('map'), {
        center: home,
        zoom: 12,
        styles: styles.silver
      });

      $('.intro-screen').fadeOut( 200, function() {
        $(this).css('display','none');
      });

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);

      if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(function(position) {
         var pos = {
           lat: position.coords.latitude,
           lng: position.coords.longitude
         };
         console.log("lat:" + pos.lat + " " + "lng:" + pos.lng);

         list.forEach(function(place){
           service.textSearch({
             location: pos,
             radius: 1500,
             query: place
           }, App.callback);
         });

         var userMarker = new google.maps.Marker({
           map: map,
           position: pos,
           animation: google.maps.Animation.BOUNCE,
           icon: 'img/person.svg'
         });

         setTimeout(function(){
           userMarker.setAnimation(null);
           console.log('stop bouncing dammit!');
         }, 2200);

         map.setCenter(pos);

        }, function() {
          handleLocationError(true, marker, map.getCenter());
        });
      } else {
        handleLocationError(false, marker, map.getCenter());
      }
    },

    callback: function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        $('.loader').css('display', 'none');
        for (var i = 0; i < results.length; i++) {
          App.createMarker(results[i]);
          console.log(results[i]);
        }
      }
    },

    createMarker: function(place) {
      var placeLoc = place.geometry.location;
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        animation: google.maps.Animation.DROP,
        icon: 'img/marker.svg'
      });

      google.maps.event.addListener(marker, 'click', function() {
        var infoFormat =
          '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="infowindow-image">'+
              '<img  src="' + place.photos[0].getUrl({ maxWidth: 270 }) + '" />' +
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + place.name + '</h3>'+
            '<div id="bodyContent">'+
            '<p>' + place.formatted_address + '</p>' +
            '<p> <span style="font-weight: bold;">What to eat: </span>' + speacialty + '</p>' +
            '<p id="open-close">' + (place.opening_hours.open_now ? '<span style="color:green;">Open Now</span>' : '<span style="color:red;">Closed</span>') + '</p>' +
            '</div>' +
          '</div>';
        infowindow.setContent(infoFormat);
        infowindow.open(map, this);
      });
    }

  };

  App.init();

});
