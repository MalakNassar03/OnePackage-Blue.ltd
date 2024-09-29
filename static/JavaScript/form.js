$(document).ready(function () {
    const $MessageDiv = $('#message');// Select the success message div
    const $spinnerWrapper = $('.spinner-wrapper');

    function clearErrors() {
        $('.error-message').each(function ()  {
            $(this).text('');// this element amke it empty
        });
    }

    function setErrorMessage(inputName, message) {
        const $inputElement = $(`[name="${inputName}"]`); //0 : input#full_name.form-input.is-required length : 1 prevObject : ce.fn.init {0: document, length: 1} [[Prototype]] : Object
        console.log($inputElement)
        if ($inputElement!==null) {//checks if it is found on the page
            const $errorSpan = $inputElement.closest('.inputBox').next('.error-message'); // select the very next sibling that is near the input box
            if ($errorSpan) {
                $errorSpan.text(message);
            }

        }
    }

    function showLoading() {
        $spinnerWrapper.css('display', 'flex');
    }

    function hideLoading() {
        $spinnerWrapper.css('display', 'none');
    }

    // Function to validate the form
    function validate(_isValid) {
        clearErrors();



        $('.is-required').each(function ()  {
            const $isRequired = $(this);
            const inputValue = $isRequired.val();



            if (inputValue === ''|| inputValue === null) {
                setErrorMessage($isRequired.attr('id'), 'this field is required');
                _isValid = false
                $MessageDiv.text('please enter the required field').css({
                    display: 'block',
                    color: 'red'
                });
                hideLoading();

            }

        });
        return _isValid
    }

    function submitForm(e) {
        e.preventDefault();// reloads the page with each submission

        const $myform = $('#myform');
        var $formData = new FormData($myform[0]);// if i use the $myfrom(object) directly it will not work bc it will pass and object not an element $myform[0](element)
        showLoading();

        clearErrors();


        let _isValid = true;
        validate(_isValid)


        if (!validate(_isValid)) {
            return;
        }
        // api url
        $.ajax({
            url: "https://samoudi.demo.ps/post.php",
            type: "POST",
            data: $formData,
            contentType: false, //This setting prevents jQuery from automatically setting the Content-Type header of the request.
            processData: false, //This setting prevents jQuery from automatically processing (i.e., converting) the data into a query string
            dataType: "json",
            success:  (resp) => {
                console.log("resp from server ", resp);
                hideLoading();

                $MessageDiv.hide();
                if (resp.status) {
                    $MessageDiv.text(resp.message).show().css({
                        color: 'green'
                    });
                    $myform[0].reset();

                } else {
                    if (resp.errors) {
                        $.each(resp.errors, function (field, error) {
                            setErrorMessage(field, error);
                        });

                    }
                }
                hideLoading();

            },
            error: (xhr) => {// CAN BE USED TO ACCESS THE RESPONSE
                console.log(xhr);
                hideLoading();
                const errorData = xhr.responseJSON;
                console.log("Response JSON:", xhr.responseJSON); // If the response is JSON


                // Check if there are specific field errors from the server
                if (errorData && errorData.errors) {
                    $.each(errorData.errors, function (field, error) {
                        setErrorMessage(field, error);
                    });
                }

                // Display a general message if provided
                if (errorData && errorData.message) {
                    $MessageDiv.text(errorData.message);
                    $MessageDiv.show();
                    $MessageDiv.css('color', 'red');
                }

            }
        })

    }
    hideLoading();
    const $myform = $('#myform');
    if ($myform.length) {
        $myform.on("submit", submitForm);
    }
});


