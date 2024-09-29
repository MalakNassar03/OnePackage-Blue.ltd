// import ringImage from '../../dist/images/90-ring.svg';

$(document).ready(function () {
    function lazyLoad() {
        $('.lazyLoad').each(function () {
            let element = $(this);
            if (element.is(':visible') && element.offset().top < $(window).scrollTop() + $(window).height()) {// when you are on the image section of the page.(visible, the offset top gets the distance from the top of the image to the top of the image, window.scroll => gets where we are on the page, also getting the hieght of the window that is showing
                let dataSrc = element.attr('data-src');// get the data-img attr
                if (dataSrc) {// if ir is not null
                    // Preload the actual image
                    let realImage = new Image();
                    realImage.src = dataSrc;

                    realImage.onload = ()=> {

                        if (element.is('img')) {
                            // For <img> tags, set the 'src' attribute
                            element.attr('src', dataSrc);
                        } else if (element.is('div')) {
                            // For divs, set the background image
                            element.css('background-image', `url(${dataSrc})`);
                        }
                        element.removeAttr('data-src'); // so that the new src becomes the data-src
                        element.removeClass('.lazyLoad');
                    }
                }
            }
        });
    }

    // $('.lazyLoad').attr('src', 'static/images/90-ring.svg');
    // $('.lazyLoad').each(function () {
    //     let element = $(this);
    //     if (element.is('img')) {
    //         element.attr('src', 'static/images/90-ring.svg'); // Set spinner for img elements
    //     }else {
    //         element.css('background-image', `url(static/images/90-ring.svg)`);
    //
    //     }
    // });
    // $('.lazyLoad').css('background-image', `url(${ringImage})`);

    // Run on scroll and when the page loads
    $(window).on('scroll', lazyLoad);
    lazyLoad();
});
