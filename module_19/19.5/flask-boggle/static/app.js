console.log('loading js')
let $form = $('#submission');

localStorage.setItem('totalScore', '0')

async function parseSubmission(evt) {
    evt.preventDefault();
    let guess = $('#guess').val();

    res = await axios.post("http://127.0.0.1:5000/check_submission", { guess: guess })

    let newSpan = $('<span>').addClass('word-list').text(`${guess}, `)

    const isValid = res.data.data.is_valid;

    $('#last-word').text("Status of last word: " + isValid)

    if (isValid === 'ok') {
        $(`#word-list-container`).append(newSpan);
        localStorage.setItem('totalScore', parseInt(localStorage.getItem('totalScore')) + guess.length)
        $('#total-score').text(`Total Score: ${localStorage.getItem('totalScore')}`)
    } else {
        $(`#incorrect-word-list-container`).append(newSpan);
    }
    totalScore = res.data.data.valid_words.reduce((prev, current) => {
        return prev + current.length;
    }, 0)
    $('input').val('')
}

async function decrementTimer(timeObj) {
    timeObj['time'] -= 1
    $('#timer').text(`Time Remaining: ${timeObj.time}`)
    if (timeObj.time == 0) {
        clearInterval(intervalId);
        $form.off('submit') // delete previous function
        $form.on('submit', async (evt) => {
            evt.preventDefault()
            alert('Game over')
        })
        let res = await axios.post('/game_over', { current_score: localStorage.getItem('totalScore') });
        console.log(res)
    }
}

let intervalId;
async function game(evt) {
    console.log("in game")
    $form.on('submit', parseSubmission)
    let time = { time: 60 }
    $('#timer').text(`Time Remaining: ${time.time}`)
    intervalId = setInterval(decrementTimer.bind(null, time), 1000);
}

document.addEventListener("DOMContentLoaded", game)

