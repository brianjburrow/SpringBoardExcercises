const fs = require('fs');

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

cat(argv[2])