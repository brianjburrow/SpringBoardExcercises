const express = require('express');

const app = express();


function mode (arr) {
    // https://javascript.tutorialink.com/calculating-the-mode-value-of-an-array/
    const numberOccurence = {}
    const mostOccurent = []
  
    for (const numberValues of arr) {
      if (numberOccurence[numberValues]) {
        numberOccurence[numberValues] += 1
      } else {
        numberOccurence[numberValues] = 1
      } 
    }
  
    let timesOccured = Object.values(numberOccurence)
    let numbersSorted = timesOccured.sort((a, b) => b - a)
  
    for (const keys of Object.keys(numberOccurence)) {
      if (numberOccurence[keys] === numbersSorted[0]) {
        mostOccurent.push(Number(keys)) 
      }
    }
  
    return mostOccurent.sort((a, b) => a - b)
  }
  
  

  
  

function computeMean(array){
    let obj = {operation: "mean",
    value: null}
    obj.value = array.reduce((p,c,_,a) => p + c/a.length,0)
    return obj
}

function computeMedian(array){
    let obj = {operation: "median",
    value: null}
    array.sort()
    let midPoint = Math.floor(array.length / 2);
    if (array.length % 2 == 0){
        // array has even number of elements
        // average the two middle values
        obj.value = (array[midPoint - 1] + array[midPoint])/2;
    } else {
        obj.value = array[midPoint];
    }
    return obj
}

function computeMode(array){
    let obj = {operation: "mode",
    value: null}


    obj.value = mode(array);
    return obj;
}

function qStringToArray({nums}){
    return nums.split(',').map((element) => {
        let int = parseInt(element);
        if (isNaN(int)){
            throw new Error("Must pass in integers or floats.")
        } else {
            return int;
        }
    })
}

function processQueryString(qString, res){
    if (!qString.nums){
        // query string is empty
        res.status(400).send("Nums are required");
        return null;
    } 
    try {
        console.log(qStringToArray(qString));
        return qStringToArray(qString);
    } catch {
        res.status(400).send("Array must be integers only.");
        return null;
    }
}

app.get('/mean', (req, res) => {
    const qString = req.query;
    let array = processQueryString(qString, res);
    if (array){
        return res.json(computeMean(array));
    }
})

app.get('/median', (req, res)=>{
    const qString = req.query;
    let array = processQueryString(qString, res);
    if (array){
        return res.json(computeMedian(array));
    }
})

app.get('/mode', (req, res)=>{
    const qString = req.query;
    let array = processQueryString(qString, res);
    if (array){
        return res.json(computeMode(array));
    }
})

// should be at the body of the file
app.listen(3000, function() {
    console.log('App on port 3000');
})