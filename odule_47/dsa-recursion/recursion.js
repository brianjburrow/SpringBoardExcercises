/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length == 1) return nums[0];
  return nums[0] * product(nums.slice(1, nums.length));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  if (words.length == 1) return words[0].length;
  const nextLongest = longest(words.slice(1, words.length));
  return words[0].length > nextLongest ? words[0].length : nextLongest;
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  if (str.length == 0) return '';
  return `${str[0]}${everyOther(str.slice(2, str.length))}`
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] === str[str.length - 1]){
    return true && isPalindrome(str.slice(1, str.length -1))
  }
  return false;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, idx = 0) {
  if (idx === arr.length) return -1;
  if (arr[idx] === val) return idx;
  return findIndex(arr, val, idx + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  if (str.length == 1) return str[0];
  return `${str[str.length-1]}${revString(str.slice(0, str.length-1))}`
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let stringArr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") stringArr.push(obj[key]);
    if (typeof obj[key] === "object") stringArr.push(...gatherStrings(obj[key]));
  }
  return stringArr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {

}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
