let numbersAPI = `http://numbersapi.com/`;

// get deck of cards
let deckOfCardsAPI = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

let drawCardAPI
let deck = axios.get(deckOfCardsAPI)
.then(data=>{
    let deck_id = data.data.deck_id;
    drawCardAPI = `http://deckofcardsapi.com/api/deck/${deck_id}/draw?count=1`
    axios.get(drawCardAPI).then(data=>{
        console.log(data.data.cards[0].value, data.data.cards[0].suit);
    })

})
    .catch(error=>{console.log(error)})

function drawCard(){
    console.log('drawing card')
    let body = document.querySelector('body');
    axios.get(drawCardAPI).then(data=>{
        let string = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
        let div = document.createElement('div');
        div.innerText = string;
        body.append(div)
    })
    .catch(error => console.log(error))
}

function addFact(number){
    let body = document.querySelector('body');
    axios.get(`${numbersAPI}${number}/trivia?json`)
    .then(data => {
        let div = document.createElement('div');
        div.innerText = data.data.text;
        body.append(div)
    })
    .catch(error => console.log(error))
}



function addFacts(){
    let body = document.querySelector('body');
    let queryString = `${numbersAPI}`;
    for (let i = 0; i < arguments.length; i++){
        queryString = queryString + arguments[i]
        if (i < arguments.length - 1){
            queryString = queryString + ','
        }
    }
    queryString = queryString + '/trivia?json';
    axios.get(queryString)
    .then(data => {
        let div;
        for (let entry in data.data){
            console.log(entry)
            div = document.createElement('div');
            div.innerText = `${data.data[entry]}`;
            body.append(div);
        }
    })
    .catch(error => console.log(error))
}



document.addEventListener("DOMContentLoaded", function(event) { 
    for (let i = 0; i < 4; i++){
        addFact(3);
    }
    let drawCardButton = document.querySelector('#draw-card-button');
    drawCardButton.addEventListener('click', drawCard);
  });