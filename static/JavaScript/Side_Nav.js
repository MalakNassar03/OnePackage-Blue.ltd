
$(document).ready(() =>{
    window.showSidebar = () => {
        const $sidebar = $('.side_nav');
        $sidebar.show();
    };

    window.closeSidebar = () => {
        const $sidebar = $('.side_nav');
        $sidebar.hide();
    };

});


