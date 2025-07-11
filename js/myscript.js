
  $(document).ready(function(){
    $(".home-car").owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      nav: false,
      dots: true
    });
  });
$(document).ready(function(){
    $('.owl-carousel.word-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      smartSpeed: 600,
      navText: ['<span class="owl-prev-arrow"><i class="fa-solid fa-arrow-left"></i></span>', '<span class="owl-next-arrow"><i class="fa-solid fa-arrow-right"></i></span>'],
      responsive:{
        0:{ items:1 },
        768:{ items:1 },
        1024:{ items:1 }
      }
    });
  });

  $(document).ready(function(){
    $('.art_meet_slider').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 4000,
      smartSpeed: 600,
      navText: ['<span class="owl-prev-arrow"><i class="fa-solid fa-arrow-left"></i></span>', '<span class="owl-next-arrow"><i class="fa-solid fa-arrow-right"></i></span>'],
      responsive:{
        0:{ items:1 },
        768:{ items:2 },
        1024:{ items:2 }
      }
    });
  });

