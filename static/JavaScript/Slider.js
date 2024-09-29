
$(document).ready(function() {

    function init(sliderClass , sliding_options) {
        const $slider = $(sliderClass);
        const $slides = $slider.find('.slider_info');// to find this class within the slider not in the whole html
        let $dots = $slider.find('.dot');
        let $sliderDots = $slider.find('.dots');
        let $circle= $slider.find('.circle');
        let $circle2=$slider.find('.circle2')
        let _defaults = {
            hasArrows:true,
            hasButtons:true,
        }
        // extend is a function that merges two things into one
        // $.extend(target, object1, object2)
        // the merged items will be stored into an empty object {}
        // the sliding_options will equal the merged object {}
        sliding_options = $.extend({}, _defaults, sliding_options); // if sliding_options equalled null then merge it with defaults

        let currentIndex = 0;

        if (sliding_options.hasButtons===false) {
            $sliderDots.css('display', 'none');
        }else if (sliding_options.hasButtons===true ) {
            $sliderDots.css('display', 'flex');
        }



        if (sliding_options.hasArrows===false) {
            $circle.css('display', 'none');
            $circle2.css('display', 'none');
        }else if (sliding_options.hasArrows===true ) {
            $circle.css('display', 'flex');
            $circle2.css('display', 'flex');
        }



        // Preload all background images so that it performs well
        $slides.each(function () {
            const imgUrl = $(this).data('bg').replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
            const img = new Image();
            img.src = imgUrl;
        });




        function showNextSlide() {


            // Hide the current slide and remove the active class
            $slides.eq(currentIndex).hide().removeClass('active');
            $slides.eq(currentIndex).show().addClass('previous');

                $dots.eq(currentIndex).removeClass('active');


            // Increment the index
            currentIndex = (currentIndex + 1) % $slides.length;


            // Show the next slide and add the active class
            $slides.eq(currentIndex).show().addClass('active');

                $dots.eq(currentIndex).addClass('active');


            $slides.eq((currentIndex - 1 + $slides.length) % $slides.length).hide().removeClass('previous');
            // Update the slider background image
            const newBg = $slides.eq(currentIndex).data('bg');
            $slider.css('backgroundImage', newBg);

        }

            function goToSlide(index) {
                // Ensure index is within bounds
                if (index < 0 || index >= $slides.length) return;

                // Hide the current slide and remove the active class for both the dots and slider
                $slides.eq(currentIndex).hide().removeClass('active');
                $dots.eq(currentIndex).removeClass('active');

                // get the index that will be pressed
                currentIndex = index;
                $slides.eq(currentIndex).show().addClass('active');
                $dots.eq(currentIndex).addClass('active');

                // Update the slider background image
                const newBg = $slides.eq(currentIndex).data('bg');
                // to get the image
                $slider.css('backgroundImage', newBg);
            }
            function arrowNav(direction) {

                $slides.eq(currentIndex).hide().removeClass('active');
                $dots.eq(currentIndex).removeClass('active');

                if (direction === 'next') {
                    currentIndex = (currentIndex + 1) % $slides.length;
                } else if (direction === 'prev') {
                    currentIndex = (currentIndex - 1 + $slides.length) % $slides.length;
                }

                $slides.eq(currentIndex).show().addClass('active');
                $dots.eq(currentIndex).addClass('active');

                // Update the slider background image
                const newBg = $slides.eq(currentIndex).data('bg');
                // to get the image
                $slider.css('backgroundImage', newBg);

            }




        // Initially show the first slide and set the background image
        $slides.eq(currentIndex).show().addClass('active');
        $dots.eq(currentIndex ).addClass('active');
        const initialBg = $slides.eq(currentIndex).data('bg');
        $slider.css('backgroundImage', initialBg);

        // Force reflow to ensure styles are applied
        $slides.eq(currentIndex).outerHeight();

        // Set an interval to show the next slide every 5 seconds
        let interval = setInterval(showNextSlide, 5000);
        // Attach click event to dots
        $dots.on('click', function() {
            const index = $dots.index(this); // gets the index of the dot that it is clicked on
            clearInterval(interval)
            goToSlide(index);
        });

        $slider.find('.next').on('click', function() {
            clearInterval(interval)

            arrowNav('next');
        });

        $slider.find('.prev').on('click', function() {
            clearInterval(interval)

            arrowNav('prev');
        });
        // Make showNextSlide function accessible globally
        window[`showNextSlide_${sliderClass.replace('.', '')}`] = showNextSlide;
    }
    const _options = {
        hasButtons:true,
        hasArrows:false,
    };
    init('.slider' );
    init('.slider2',_options);


});
