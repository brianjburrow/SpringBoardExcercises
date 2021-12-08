console.log("Let's get this party started!");

let imgClasses = 'img mb-2 col-sm-6 col-md-4 col-lg-3 col-xl-2'

$(function () {
    // waiting for the dom to load
    let form = $('form');
    let textInput = $('input.searchbar');
    let searchButton = $('button.search');
    let clearButton = $('button.clear');
    let imgContainer = $('.img-container');
    console.dir(imgContainer)
    textInput.val('cat dog')

    form.on('submit', function (event) { event.preventDefault() })

    searchButton.on('click', function (event) {
        if (textInput.val()) {
            let url = `http://api.giphy.com/v1/gifs/search?q=${textInput.val()}&api_key=9nOjDXZRwtCuw2FY9c9C3KoKN4ev9PQf`
            addImage(url);
        }
    });

    clearButton.on('click', function (event) {
        console.log('event2', event)
        event.preventDefault();
        imgContainer.html("")
    })

})

async function addImage(url) {
    let textInput = $('input.searchbar');
    let imgContainer = $('.img-container');
    let response = await axios.get(url);
    let index = Math.floor(Math.random() * (response.data.data.length - 1))

    $("<div>").addClass(imgClasses)
        .append(makeCard(response.data.data[index].images.original.url))
        .appendTo(imgContainer);

    return response
}


function makeCard(url) {
    return `
    <div class="card shadow-sm rounded">
        <img class="card-img-top img-fluid" src=${url}  alt="Card image cap">
    </div>
    `
}
