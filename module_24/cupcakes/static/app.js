let ul = $('ul')
document.addEventListener('DOMContentLoaded', async (event) => {
    await displayCakes();
})

async function displayCakes() {
    ul.empty()
    res = await axios.get('http://127.0.0.1:5000/api/cupcakes')
    console.log(res.data.cupcakes)
    res.data.cupcakes.forEach((cake) => ul.append(`<li>${cake.flavor} comes in size ${cake.size} and is rated ${cake.rating}</li>`))
}


let form = $('form')
form.on('submit', async (evt) => {
    evt.preventDefault()
    const flavor = $('#flavor')[0];
    const rating = $('#rating')[0];
    const size = $('#size')[0];
    const image = $('#image')[0];
    const json = {
        flavor: flavor.value,
        rating: rating.value,
        size: size.value,
        image: image.value
    }
    await axios.post('/api/cupcakes', json)
    await displayCakes()
})