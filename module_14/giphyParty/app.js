console.log("Let's get this party started!");


$(function () {
    // waiting for the dom to load

    let form = $('form');
    let textInput = form.find('input.search');
    let searchButton = form.find('button.search');
    let clearButton = form.find('button.clear');
    let imgContainer = $('.img-container');

    form.on('submit', function (event) { event.preventDefault() })
    searchButton.on('click', function (event) {
        if (textInput.val()) {
            event.preventDefault();
            $("<div>").addClass('img').text(`${textInput.val()}`).appendTo(imgContainer);
            textInput.val('');
        }
    });

    clearButton.on('click', function (event) {
        event.preventDefault();
        imgContainer.html("")
    })

})

