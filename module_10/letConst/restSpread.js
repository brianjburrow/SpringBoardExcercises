
// refactor this function
function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function (num) {
        return num % 2 === 0
    });
}

// answer
filterOutOdds = (...args) => args.filter(num => num % 2 === 0);

//Write a function called findMin that accepts a variable number of
// arguments and returns the smallest argument.
// Make sure to do this using the rest and spread operator.

findMin = (...args) => args.reduce((min, nextVal) => min <= nextVal ? min : nextVal, args[0])

// Write a function called mergeObjects that accepts two objects and returns a new object 
//which contains all the keys and values of the first object and second object.

mergeObjects = (object1, object2) => {
    return { ...object1, ...object2 }
}

// 

doubleAndReturnArgs = (arr, ...extra) => [...arr, ...extra.map(value => 2 * value)];


/** remove a random element in the items array
and return a new array without that item. */


removeRandom = items => {
    const idx = Math.floor(Math.Random * (items.length - 1));
    return [...items.slice(0, idx), ...items.slice(idx + 1)]
}

/** Return a new array with every item in array1 and array2. */

extend = (array1, array2) => [...array1, ...array2];

/** Return a new object with all the keys and values
from obj and a new key/value pair */

function addKeyVal(obj, key, val) {
    return { ...obj, [key]: val };
}


/** Return a new object with a key removed. */

function removeKey(obj, key) {
    let { [key]: pulledKey, ...rest } = obj;
    return rest;
}


/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    return { ...obj1, ...obj2 }
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
    return { ...obj, [key]: val }
}