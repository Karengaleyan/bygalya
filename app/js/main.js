//slider

$(document).ready(function () {
   $('.slider-photo').slick({
      slidesToShow: 4,
      autoplay: true,
      autoplaySpeed: 1500,
      variableWidth: true,
      centerMode: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            }
         },
         {
            breakpoint: 600,
            settings: {
               slidesToShow: 2,
            }
         },
         {
            breakpoint: 480,
            settings: {
               slidesToShow: 1,
            }
         }
      ]
   });
});

//navigation

window.addEventListener('scroll', function () {
   var header = document.querySelector('header');
   var navElement = document.querySelector('.header__menu-fixed');
   var scrollPosition = window.scrollY;
   var logo = document.querySelector('.logo');

   if (scrollPosition > logo.offsetHeight) {
      navElement.classList.add('fixed-menu');
   } else {
      navElement.classList.remove('fixed-menu');
   }
});

//scrollButtonTop
window.addEventListener('scroll', function () {
   const scrollToTopButton = document.getElementById("scrollToTopButton");

   if (window.scrollY > 200) {
      scrollToTopButton.classList.add('show');
      scrollToTopButton.classList.remove('hide');
   } else {
      scrollToTopButton.classList.add('hide');
      scrollToTopButton.classList.remove('show');
   }
});

//scrollButtonTop
function scrollToTop() {
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
}

$(document).ready(function () {
   $('.burger').click(function () {
      $('nav').toggleClass('active');
      $('.header__menu').toggleClass('active');
   });
});

Fancybox.bind()

$(document).ready(function () {
   // if ($('[data-fancybox="video-gallery"]').length !== 0) {
   //    $('[data-fancybox="video-gallery"]').fancybox({
   //       type: 'video',
   //       iframe: {
   //          preload: false
   //       }
   //    });
   // }

   $('.js-menu-show').click(function () {
      $('.site-menu-mobile').toggleClass('is-active');
   });


   AOS.init(
      {
         duration: 800,
         once: true,
         disable: 'mobile'
      }
   );
});
