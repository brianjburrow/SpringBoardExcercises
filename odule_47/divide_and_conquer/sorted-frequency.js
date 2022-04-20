function findFirst(arr, value, low = 0, high = arr.length - 1) {
    if (high >= low) {
      let mid = low + Math.floor((high - low) / 2)
      if ((mid === 0 && arr[0] == value) || ((mid !== 0) && (arr[mid - 1] !== value) && arr[mid] === value)) {
        return mid;
      } else if (arr[mid] < value) {
        return findFirst(arr, value, mid + 1, high)
      }
      return findFirst(arr, value, low, mid - 1)
    }
    return -1;
  }

  function findLast(arr, value, low = 0, high = arr.length - 1) {
    if (high >= low) {
      let mid = low + Math.floor((high - low) / 2)
      if ((mid === (arr.length - 1) && arr[mid] == value) || (mid !== (arr.length - 1) && arr[mid + 1] > value && arr[mid] === value)) {
        return mid;
      } else if (arr[mid] <= value) {
        return findLast(arr, value, mid + 1, high)
      }
      return findLast(arr, value, low, mid - 1)
    }
    return -1;
  }

function sortedFrequency(arr, target) {
    const first = findFirst(arr, target);
    const last = findLast(arr, target);
    if ((first === -1) && (last === -1)){
        return -1
    } else {
        return last - first + 1;
    }
}

module.exports = sortedFrequency