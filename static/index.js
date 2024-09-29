// var $ = require("jquery");
import $ from "expose-loader?exposes=$,jQuery!jquery";
//
// Adds the `jquery` to the global object under the names `$` and `jQuery`
// window.jQuery = $;
// window.$ = $;
// window.$ = $; // Attach jQuery to window
//
// // Now import Owl Carousel
import 'owl.carousel';
import 'owl.carousel/dist/assets/owl.carousel.css'; // Import Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.theme.default.min.css'; // Import Owl Carousel theme CSS

// Import your other scripts

import './JavaScript/main';
import './css/page.scss'


$(document).ready(function() {
    console.log('jQuery version:', $.fn.jquery); // This should log the jQuery version
});
