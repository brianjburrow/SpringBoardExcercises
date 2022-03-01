const fs = require('fs');
const axios = require('axios').default;

const argv = process.argv

function cat(path, writefile=null){
    fs.readFile(path, encoding='utf8', (err, data)=>{
        if (err){
            console.log(`Error reading ${path}`);
            process.kill(1)
        } else {
            console.log(data)
            if (writefile){
                fs.writeFile(writefile, data, (err, data)=>{
                if(err){console.log(err)}})
            }
        }
    })
}

async function webCat(url, writefile=null){
    try {
        let res = await axios.get(url);
        console.log(res.data);
        if (writefile){
            fs.writeFile(writefile, res.data, (err, data)=>{
            if(err){console.log(err)}})
        }
    } catch (err){
        console.error(`Error reading url: ${err}`)
    }
    
}

const path = argv[argv.length - 1];

let out;
let i = 0;
for (arg of argv){
    if (arg==='--out'){
        out = argv[i+1]
    }
    i++;
}

console.log(out)

if (path.slice(0, 4) === 'http') {
    webCat(path, writefile = out);
  } else {
    cat(path, writefile = out);
  }