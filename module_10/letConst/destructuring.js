// should print 8, 1846

// should print {yearNeptuneDiscovered: 1846, yearMarsDiscovered:1659}

// `Your name is Alajandro and you like purple`
// `Your name is Melissa and you like green`
// 'Your name is undefined and you like green'

// Maya
// Marisa
// Chi


// "Raindrops on roses"
// "whiskers on kittens"
// ["Bright copper kettles",
// "warm woolen mittens",
//     "Brown paper packages tied up with strings"
// ]

// [10, 30, 20]


// refactored
const obj = { numbers: { a: 1, b: 2 } }

let { numbers: { a, b } } = obj;


// refactored
const arr = [1, 2];

[arr[1], arr[0]] = [arr[0], arr[1]];

// raceresults

const raceResults = arr => {
    let [first, second, third, ...rest] = arr;
    return { first, second, third, rest }
}