const fs = require('fs');
const axios = require('axios').default;

const argv = process.argv

function cat(path){
    fs.readFile(path, encoding='utf8', (err, data)=>{
        if (err){
            console.log(`Error reading ${path}`);
            process.kill(1)
        } else {
            console.log(data)
        }
    })
}

async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res.data);
    } catch (err){
        console.error(`Error reading url: ${err}`)
    }
    
}

const path = argv[2];

if (path.slice(0, 4) === 'http') {
    webCat(path);
  } else {
    cat(path);
  }