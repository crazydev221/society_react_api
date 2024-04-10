// Leadership Slider

$(document).ready(function () {

$(".counter").each(function () {

  var $this = $(this),
    countTo = $this.attr("data-count");
  $({ countNum: $this.text() }).animate(
    {
      countNum: countTo,
    },
    {
      duration: 5000,
      easing: "linear",
      step: function () {
        $this.text(Math.floor(this.countNum));
      },
      complete: function () {
        $this.text(this.countNum);
        //alert('finished');
      },
    }
  );
});

});

$(".leadership-slider").owlCarousel({
  margin: 0,
  items: 1,
  dots: true,
  nav: false,
  navText: [
    "<span class='fa fa-angle-left'></span>",
    "<span class='fa fa-angle-right'></span>",
  ],
  loop: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  autoplay: true,
  autoplayHoverPause: true,
  responsiveClass: false,
});

// Support Slider
$(".support-slider").owlCarousel({
  margin: 32,
  items: 4,
  dots: false,
  nav: false,
  navText: [
    "<span class='fa fa-angle-left'></span>",
    "<span class='fa fa-angle-right'></span>",
  ],
  loop: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  autoplay: true,
  autoplayHoverPause: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      margin: 0,
    },
    600: {
      items: 3,
      margin: 24,
    },
    1000: {
      items: 3.5,
    },
  },
});

// Login Slider
$(".login-slider").owlCarousel({
  margin: 0,
  items: 1,
  dots: true,
  nav: true,
  navText: [
    "<span class='fa fa-angle-left'></span>",
    "<span class='fa fa-angle-right'></span>",
  ],
  loop: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  autoplay: true,
  autoplayHoverPause: true,
  responsiveClass: false,
});

// Tutorial Slider
$(".tuts-slider").owlCarousel({
  margin: 0,
  items: 1,
  dots: true,
  nav: false,
  navText: [
    "<span class='fa fa-angle-left'></span>",
    "<span class='fa fa-angle-right'></span>",
  ],
  loop: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  autoplay: false,
  autoplayHoverPause: true,
  responsiveClass: false,
});

// Question Slider
$(".question-slider").owlCarousel({
  margin: 0,
  items: 1,
  dots: false,
  nav: true,
  navText: [
    "<span class='fa fa-angle-left'></span>",
    "<span class='fa fa-angle-right'></span>",
  ],
  loop: true,
  animateIn: "fadeIn",
  animateOut: "fadeOut",
  smartSpeed: 2000,
  autoplayTimeout: 4000,
  autoplay: false,
  autoplayHoverPause: true,
  responsiveClass: false,
});

// Mobile Menu
$(function () {
  $(".mobile-menu-toggle").click(function () {
    $("body").addClass("overflown");
    $(".mobile-menu").addClass("active");
  });
  $(".mobile-menu-close").click(function () {
    $("body").removeClass("overflown");
    $(".mobile-menu").removeClass("active");
  });
});

// Stat Counter


// Phone
$(document).ready(function () {
  $(".input-phone").intlInputPhone();
});

// On Page Load Open Modal
$(document).ready(function () {
  //$("#tutsModal").modal("show");
});
// $(document).ready(function () {
//   $("#questionModal").modal("show");
// });
$(document).ready(function () {

  var data = getCookie("purple_cookie");
  //document.cookie = "purple_cookie=wepurple; expires=Thu,20 Nov 2018 12:00:00 UTC; path=/";
  if(data === "" || data === undefined){ 
  
    document.cookie = "purple_cookie=wepurple; max-age=" + 3000*24*60*60;
    $("#tutsModal").modal("show");
  }

  $("#next_slide").click(function () {
    var $dots = $('.owl-dot');
    var $next = $dots.filter('.active').next();

    if (!$next.length)
        $next = $dots.first();

    $next.trigger('click');
  });

  $("#skip").click(function () {
    $("#tutsModal").modal("hide").html('');
  });

  $("#tutsModal").on("hidden.bs.modal", function () {
    $("#tutsModal").html('');
});


$("#div_upload").click(function () {
  alert("DFDf");
  $("#image_upload").trigger('click');
});


});


$(document).ready(function () {
  $(".mobile-menu a").click(function () {
    location.reload(true);
  });
});