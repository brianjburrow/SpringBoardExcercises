// set([1, 2, 3, 4])

// 'ref'

// it will contain two entries, with [1,2,3] as keys and true/false as outputs respectively
// because each [1,2,3] is a reference to a different array

hasDuplicate = (arr) => new Set(arr).size < arr.length

vowelCount = str => {
    // only want to go through str once
    const newMap = new Map();
    const vowels = 'aeiou';
    let isVowel;
    for (let char of str.toLowerCase()) {
        isVowel = vowels.includes(char)
        if (isVowel && newMap.has(char)) {
            newMap.set(char, newMap.get(char) + 1);
        } else if (isVowel) {
            newMap.set(char, 1);
        }
    }
    return newMap
}