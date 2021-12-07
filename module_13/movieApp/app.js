$(function () {
    console.log("DOM loaded.")

    $('form').on('submit', function (event) {
        event.preventDefault();
        let title = $('#title').get(0).value;
        let rating = $('#rating').get(0).value;

        if (parseInt(rating) < 0 || parseInt(rating) > 10) {
            throw new Error('ValueError: rating must be between 0 and 10');
        } else if (!isFinite(rating)) {
            throw new Error("TypeError: rating must be an integer.")
        }
        if (title.length < 2) throw new Error('ValueError: title must have at least two characters.')
        console.log((this));
        //$('form').after($('<div>').text(`Title: ${title}, Rating: ${rating}`));
        let btn = $('<button class="remove">').text("Delete");
        let div = $('<div>').text(`Title: ${title}, Rating: ${rating}`);
        console.dir(div)
        btn.appendTo(div);
        btn.on('click', function () {
            $(this).parent().remove();
        })
        $('form').after(div);
        $('#title').val('');
        $('#rating').val('');
    })
})