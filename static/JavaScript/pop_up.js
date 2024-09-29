
$(document).ready( function ()  {

    const $openModalButtons = $('[data-modal-target]');
    const $closeModalButtons = $('[data-close-button]');
    const $shadow = $('#shadow');
    const $modalImg = $('#modal-img');


    $openModalButtons.on('click', function () {
        const $modal = $($(this).data('modal-target'));
        const $imageUrl = $(this).data('image'); // Get the image URL from the button
        if ($modal) {
            openModal($modal);
            $modalImg.attr('src', $imageUrl); // Set the image source in the modal image
        }

    });

    $shadow.on('click',  ()=> { // when clicked on the shadow
        const $modals = $('.Cards_popUp.active')// anything that is active
        $modals.each(function () {
            closeModal($modals)
        })
    })
    $closeModalButtons.on('click',  function () {
        const $modal = $(this).closest('.Cards_popUp');// the model that is open
        console.log($modal);
        if ($modal) {
            closeModal($modal);
        }
    });


    function openModal($modal) {
        if ($modal == null) return;
        $modal.addClass('active');
        $shadow.addClass('active');
    }

    function closeModal($modal) {
        if ($modal == null) return;
        $modal.removeClass('active');
        $shadow.removeClass('active');
    }
});
