/* Loading Script */
$(window).load(function() {
  "use strict";
    	$(".loader").delay(500).fadeOut();
    	$("#mask").delay(1000).fadeOut("slow");
    });

/* Flexslider */
$(window).load(function() {
  "use strict";
	$('.flexslider').flexslider({
		animation: "fade",
		start: function(slider) {
			$('.np-controls a.next').click(function(event){
				event.preventDefault();
				slider.flexAnimate(slider.getTarget("next"));
			});
			$('.np-controls a.previous').click(function(event){
				event.preventDefault();
				slider.flexAnimate(slider.getTarget("previous"));
			});
		}
	});
});

/* Mixitup Portfolio */
jQuery(document).ready(function($) {
  "use strict";
	$('#portfolio').mixitup({
		targetSelector: '.item',
		transitionSpeed: 450
	});
});

/* Nivo - Lightbox */
jQuery(document).ready(function($) {
  "use strict";
    $('.nivo-lbox').nivoLightbox({ effect: 'fade' });
});

/* Skills */
jQuery(document).ready(function($) {
	"use strict";
	$('.skills-info').appear(function() {
    $('.skills-bg').each(function() {
      var percentage = $(this).parent().find('p span').text();
      $(this).find('span').css('width', percentage);
    });
	},{accX: 0, accY: -150});
});

/* Google map */
$(function () {
  "use strict";
  var lat = -22.948833,
      lng = -43.193128,
	    map = new GMaps({
	el: "#map",
	lat: lat,
	lng: lng,
          zoom: 6,
          zoomControl : true,
          zoomControlOpt: {
            style : "BIG",
            position: "TOP_LEFT"
          },
          panControl : true,
          streetViewControl : false,
          mapTypeControl: false,
          overviewMapControl: false
      });

      map.addMarker({
        lat: lat,
        lng: lng
      });
});

/* Moment.js */
$(function () {
  'use strict';
  $('.contact-info time').html(moment().tz('America/Sao_Paulo').format('h:mm a'));
});

/* mCustomScrollbar */
jQuery(document).ready(function($) {
  $(window).load(function(){
    $(".item").mCustomScrollbar({
      theme:"dark"
    });
  });
});
