$(function(){var e=[{type:"Bagel",dataDir:"the-20-best-bagels-in-new-york-ranked",image:"bagel.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Chicken and Waffles",dataDir:"best-chicken-and-waffles-in-nyc",image:"chickenwaffles.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Coffee",dataDir:"best-coffee-shops-in-new-york",image:"coffee.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Deli",dataDir:"best-new-york-delis",image:"deli.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Donut",dataDir:"best-donut-shops-in-new-york-city",image:"donut.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Nachos",dataDir:"best-nachos-in-nyc",image:"nachos.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Ramen",dataDir:"best-ramen-in-nyc",image:"ramen.jpg",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."},{type:"Sandwich",image:"sandwich.jpg",dataDir:"the-best-sandwich-shops-in-nyc",description:"Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui."}],t="https://www.timeout.com/newyork/restaurants/",o="https://accesscontrolalloworiginall.herokuapp.com/",a,i,s={default:null,silver:[{elementType:"geometry",stylers:[{color:"#f5f5f5"}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f5f5"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#bdbdbd"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#ffffff"}]},{featureType:"road.arterial",elementType:"labels.text.fill",stylers:[{color:"#757575"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#dadada"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#616161"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#e5e5e5"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#eeeeee"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#c9c9c9"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#9e9e9e"}]}]},n,r,l,u={getSourcesMarkup:function(e){var t=_.map(e,function(e){return u.getSingleSourceMarkup(e)});return t.join("")},getSingleSourceMarkup:function(e){return u.sourceListTemplate(e)},sourceListTemplate:_.template('<div class="col-md-6"><img src="img/<%= image %>" alt="<%= dataDir %>" data-id="<%= type %>" /><h3>Best <%= type %> Near You</h3><p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p><p><a class="btn btn-default" href="#" role="button">Search food &raquo;</a></p></div>'),getMenuMarkup:function(e){var t=_.map(e,function(e){return u.getSingleMenuMarkup(e)});return t.join("")},getSingleMenuMarkup:function(e){return u.menuListTemplate(e)},menuListTemplate:_.template('<a href="#"><li class="<%= type %>" data-id="<%= dataDir %>"><%= type %></li></a>')},m={init:function(){m.listSources(e),m.listMenu(e),m.bindEvents()},bindEvents:function(){$(".intro-screen").on("click",".btn",function(){a=$(this).parent().siblings("img").attr("alt"),i=$(this).parent().siblings("img").attr("data-id"),$(".loader").css("display","flex"),m.scrapeFoodReturn()}),$(".dropdown-burger").on("click","a li",function(){a=$(this).attr("data-id"),i=$(this).attr("class"),$(".dropdown-burger").css("display","none"),$(".loader").css("display","flex"),m.scrapeFoodReturn()}),$(".burger").on("click",function(){$(".dropdown-burger").css("display","block")}),$(".dropdown-burger a img").on("click",function(){$(".dropdown-burger").css("display","none")}),$("a .burger").on({mouseenter:function(){$("a .burger g g path").attr("fill","#FCCB30")},mouseleave:function(){$("a .burger g g path").attr("fill","#FFF")}})},listSources:function(e){var t=u.getSourcesMarkup(e);$(".intro-screen .container .row").html(t)},listMenu:function(e){var t=u.getMenuMarkup(e);$(".dropdown-burger ul").html(t)},scrapeFoodRequest:function(){return $.ajax({url:o+t+a,dataType:"html"})},scrapeFoodReturn:function(){var e=m.scrapeFoodRequest();e.done(function(){var t=e.responseText,o=$.parseHTML(t),a=$("<div></div>");a.html(o);var i=$(".feature-item__column h3 a",a),s=_.pluck(i,"innerText");s.pop();var n=$(".listings_flag.icon.icon_pin",a),r=_.pluck(n,"innerText"),r=_.map(r,function(e){return e.slice(13,-9)}),l=s.map(function(e,t){return e+" "+r[t]});console.log(sum),m.initMap(l)})},initMap:function(e){var t={lat:40.6357511,lng:-73.9596188};n=new google.maps.Map(document.getElementById("map"),{center:t,zoom:12,styles:s.silver}),$(".intro-screen").fadeOut(200,function(){$(this).css("display","none")}),r=new google.maps.InfoWindow;var o=new google.maps.places.PlacesService(n);navigator.geolocation?navigator.geolocation.getCurrentPosition(function(t){var a={lat:t.coords.latitude,lng:t.coords.longitude};console.log("lat:"+a.lat+" lng:"+a.lng),e.forEach(function(e){o.textSearch({location:a,radius:1500,query:e},m.callback)});var i=new google.maps.Marker({map:n,position:a,animation:google.maps.Animation.BOUNCE,icon:"img/person.svg"});setTimeout(function(){i.setAnimation(null),console.log("stop bouncing dammit!")},2200),n.setCenter(a)},function(){handleLocationError(!0,marker,n.getCenter())}):handleLocationError(!1,marker,n.getCenter())},callback:function(e,t){if(t===google.maps.places.PlacesServiceStatus.OK){$(".loader").css("display","none");for(var o=0;o<e.length;o++)m.createMarker(e[o]),console.log(e[o])}},createMarker:function(e){var t=e.geometry.location,o=new google.maps.Marker({map:n,position:e.geometry.location,animation:google.maps.Animation.DROP,icon:"img/marker.svg"});google.maps.event.addListener(o,"click",function(){var t='<div id="content"><div id="siteNotice"></div><div id="infowindow-image"><img  src="'+e.photos[0].getUrl({maxWidth:270})+'" /></div><h3 id="firstHeading" class="firstHeading">'+e.name+'</h3><div id="bodyContent"><p>'+e.formatted_address+'</p><p> <span style="font-weight: bold;">What to eat: </span>'+i+'</p><p id="open-close">'+(e.opening_hours.open_now?'<span style="color:green;">Open Now</span>':'<span style="color:red;">Closed</span>')+"</p></div></div>";r.setContent(t),r.open(n,this)})}};m.init()});