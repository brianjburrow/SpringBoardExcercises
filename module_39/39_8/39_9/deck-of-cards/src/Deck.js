import React, { useState, useEffect} from 'react';
import axios from 'axios';
import "./Deck.css"


const Deck = ()=>{
    console.log("ENTERING DECK FUNCTION")
    let [hiddenDeck, setHiddenDeck] = useState(null);
    let [displayedDeck, setDisplayedDeck] = useState([]);
    const [hasClicked, setHasClicked] = useState(false);
    console.log(displayedDeck)
    useEffect(()=>{
        async function getDeck(){
            const SHUFFLEAPI = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
            const {data} = await axios.get(SHUFFLEAPI);
            const DRAWAPI = `http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`;
            const {data:deckData} = await axios.get(DRAWAPI);
            console.log('runnig getDeck',deckData.cards)
            setHiddenDeck(deckData.cards);
        }
        getDeck();
    }, [])

    let [state, setState] = useState([]);

    useEffect(()=>{
        let intervalId;
        if (hasClicked){
             intervalId = setInterval(()=>{
                const card = hiddenDeck[hiddenDeck.length - 1];
                console.log("INTERIOR", displayedDeck);
                setDisplayedDeck(nd => [...nd, card]);
                setHiddenDeck(hd => [...hd.slice(0,-1)]);
                console.log("HIDDENDECKINSIDE", hiddenDeck)
            }, 1000);
        } 
        return ()=>{clearInterval(intervalId)}
    }, [hasClicked, displayedDeck])
    return (<>
        {console.log("RENDERING DECK")}
        {hiddenDeck && hiddenDeck.length == 0 ? alert("GAME OVER") : null}
        <button onClick={hiddenDeck && hiddenDeck.length > 0 ? ()=>setHasClicked(!hasClicked):()=>console.log('err')}>{hiddenDeck ? "Display New Card!!" : "Fetching Deck!"}</button>
        {displayedDeck.length > 0  ? displayedDeck.map(card => <div key={card.code}>{card.code}</div>) : null}
    </>)
}

export default Deck;

// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import "./Deck.css"


// const Deck = ()=>{
//     let [hiddenDeck, setHiddenDeck] = useState(null);
//     let [displayedDeck, setDisplayedDeck] = useState([]);
//     const [hasClicked, setHasClicked] = useState(false);

//     useEffect(()=>{
//         async function getDeck(){
//             const SHUFFLEAPI = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
//             const {data} = await axios.get(SHUFFLEAPI);
//             const DRAWAPI = `http://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=52`;
//             const {data:deckData} = await axios.get(DRAWAPI);
//             console.log('runnig getDeck',deckData.cards)
//             return setHiddenDeck(deckData.cards);
//         }
//         getDeck();
//     }, [])

//     useEffect(()=>{
//         let intervalId;
//         if (hasClicked){
//              intervalId = setInterval(()=>{
//                 const card = hiddenDeck[hiddenDeck.length - 1];

//                 setDisplayedDeck(nd => [...nd, card]);
//                 setHiddenDeck(hd => [...hd.slice(0,-1)]);
//                 console.log("HIDDENDECKINSIDE", hiddenDeck)
//             }, 1000);
//         } 
//         return ()=>{clearInterval(intervalId)}
//     }, [hasClicked, displayedDeck])
//     return (<>
//         {hiddenDeck && hiddenDeck.length == 0 ? alert("GAME OVER") : null}
//         <button onClick={hiddenDeck && hiddenDeck.length > 0 ? ()=>setHasClicked(!hasClicked):()=>console.log('err')}>{hiddenDeck ? "Display New Card!!" : "Fetching Deck!"}</button>
//         {displayedDeck.length > 0  ? displayedDeck.map(card => <div key={card.code}>{card.code}</div>) : null}
//     </>)
// }

// export default Deck;