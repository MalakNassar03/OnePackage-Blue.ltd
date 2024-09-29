
$(document).ready( ()  => {
    $(".owl-carousel").owlCarousel({
        items:1,
        loop:true,
        nav:true,
        dots:true,
        lazyLoad:true,
        autoplay:true,
        autoplaySpeed:5000,
        onInitialized: function() {
            $('.owl-dot').each(function(index) {
                $(this).attr('aria-label', 'Go to slide ' + (index + 1));
            });
            $('.owl-prev, .owl-next').removeAttr('role');

            // Add aria-label attributes for screen readers
            $('.owl-prev').attr('aria-label', 'Previous slide');
            $('.owl-next').attr('aria-label', 'Next slide');
        }
//             $('.slider-content').each(function () {
//                 var bgImg = $(this).attr('data-src');
//                 let $this = $(this);
// // to pre load the images
//                 let img = new Image();// create a new img element so i can preload
//                 img.src = bgImg;
//                 $this.find('.spinner').show();
//
//                 // when the image is loaded
//                 img.onload = function () {
//                     $this.css('background-image', `url(${bgImg})`);
//                     $this.find('.spinner').hide(); // hide
//                 }
//
//             });
//         }
    });
});

