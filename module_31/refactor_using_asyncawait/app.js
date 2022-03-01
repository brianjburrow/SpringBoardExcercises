let numbersAPI = `http://numbersapi.com/`;

// get deck of cards
let deckOfCardsAPI = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"

let drawCardAPI;
async function get_deck_draw_url(){
    if (!drawCardAPI){
        // get the data
        let data = await axios.get(deckOfCardsAPI);
        let deck_id = data.data.deck_id;
        return`http://deckofcardsapi.com/api/deck/${deck_id}/draw?count=1`
    } else {
        // don't search for a new deck
        return drawCardAPI
    }
}



async function drawCard(){
    drawCardAPI = await get_deck_draw_url()
    let body = document.querySelector('body');
    let data = await axios.get(drawCardAPI)
    let string = `${data.data.cards[0].value} of ${data.data.cards[0].suit}`;
    let div = document.createElement('div');
    div.innerText = string;
    body.append(div)
}


async function addFact(number){
    let body = document.querySelector('body');
    let res = await axios.get(`${numbersAPI}${number}/trivia?json`)
    
    let data = res.data.text;
    let div = document.createElement('div');
    div.innerText = data;
    body.append(div);
}

async function addFacts(){
    let body = document.querySelector('body');
    let queryString = `${numbersAPI}`
    for (let i = 0; i < arguments.length; i++){
        queryString = queryString + arguments[i]
        if (i < arguments.length - 1){
            queryString = queryString + ','
        }
    }
    queryString = queryString + '/trivia?json';

    let res = await axios.get(queryString)
    for (let entry in res.data){
            div = document.createElement('div');
            div.innerText = `${res.data[entry]}`;
            body.append(div);
        }
}


document.addEventListener("DOMContentLoaded", function(event) { 
    for (let i = 0; i < 4; i++){
        addFact(3);
    }
    let drawCardButton = document.querySelector('#draw-card-button');
    drawCardButton.addEventListener('click', drawCard);
  });