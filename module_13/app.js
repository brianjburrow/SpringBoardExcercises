/*
When the DOM is ready, console.log the message “Let’s get ready to party with jQuery!”

Give all images inside of an article tag the class of image-center (this class is defined inside of the style tag in the head).

Remove the last paragraph in the article.

Set the font size of the title to be a random pixel size from 0 to 100.

Add an item to the list; it can say whatever you want.

Scratch that; the list is silly. Empty the aside and put a paragraph in it apologizing for the list’s existence.

When you change the numbers in the three inputs on the bottom, the background color of the body should change to match whatever the three values in the inputs are.

Add an event listener so that when you click on the image, it is removed from the DOM.
*/

$(() => {
    console.log("Let's get ready to party with jQuery!");

    // add an anchor tag with class 'image-center'
    $('<a>').addClass('image-center').appendTo("img");

    // remove the last paragraph
    $('p').last().remove()

    // Set the font size of the title to be a random pixel size from 0 to 100.
    $('#title').css("font-size", Math.floor(Math.random() * 100));

    $('ol').append($('<li>Additional Information</li>'))

    $('aside').html("<p>That list should never have been made, I'm sorry.</p>")

    console.dir($('.form-control'))

    $('.form-control').on('change', function () {
        let forms = $('.form-control')
        let setting = `rgb(${forms.get(0).value}, ${forms.get(1).value}, ${forms.get(2).value})`;
        $('body').css('background-color', setting)
    })

    $('img').on('click', function () {
        (this).remove();
    })
})

