/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  objectIncludesKey(object, key){
    if (object.hasOwnProperty(key)){
      return true;
    }
    return false;
  }
  makeChains() {
    let textSize = this.words.length;
    let startWord;
    let nextWord;
    for (let i = 1; i < textSize; i++){
      startWord = this.words[i-1].toLowerCase().replace(/[\s|\.]+$/i, '');
      nextWord = this.words[i].toLowerCase().replace(/[\s|\.]+$/i, '');
      if (this.objectIncludesKey(this.chains, startWord)){
        // chains has the start word as a key already, need to check if following word is
        // already stored.  If not, push new value into array
        if ( !this.chains[startWord].includes(this.words[i]) ){this.chains[startWord].push(nextWord);}
      } else {
        // add the pair to the object
        this.chains[startWord] = [nextWord];
      }
    }
    return this.chains;
  }

  selectRandomArrayItem(array){
    return array[Math.floor(Math.random() * array.length)];
  }
  /** return random text from chains */

  makeText(numWords = 100) {
    let text = [];
    let allWords = Object.keys(this.chains);
    // initialize the algorithm
    text.push(this.selectRandomArrayItem(allWords));

    // fill the remaining array
    let newWordOptions = null;
    let previousWord = null;
    let newWord = null;
    for (let i = 1; i < numWords; i++){
      previousWord = text[i-1];
      if (previousWord === '.'){
        // start a new sentence at random
        newWordOptions = allWords;
      } else {
        // continue the sentence
        newWordOptions = this.chains[previousWord];
      }
      if (!newWordOptions){
        // not a key in the dictionary (no word followed it), end the sentence
        newWord = '.';
      } else {
        // key is in the dictionary, continue the sentence
        newWord = this.selectRandomArrayItem(newWordOptions);
      }
      text.push(newWord);
    }
    return text.join(" ");
  }
}

module.exports = {MarkovMachine};