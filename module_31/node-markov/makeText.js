const {MarkovMachine} = require('./markov');
const fs = require('fs');
const axios = require('axios');


let filepath = process.argv[2];


function isValidHttpUrl(string) {
    console.log(string)
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

async function makeMarkovMachine(){
    console.log(filepath)
    if (isValidHttpUrl(filepath)){
        console.log('in validHttpUrl')
        try{
            let res = await axios.get(filepath)
            let mm = new MarkovMachine(res.data);
            console.log(mm.makeText(100));
        } catch {
            console.log(`Error reading text from URL ${filepath}`)
            process.exit()
        }
    } else {
        console.log('else')
        fs.readFile(filepath, 'utf8', (err, data)=>{
            if (err){
                // was an error reading file
                console.log('There was an error reading the file')
                console.log(err);
                process.exit();
            } else {
                let mm = new MarkovMachine(data);
                console.log(mm.makeText(100));
            }
        })
    }  
}

makeMarkovMachine()
