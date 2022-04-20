function findFloor(arr, value, low = 0, high = arr.length - 1) {
    if (low === high){
        // only one element left
        if (arr[low] <= value) return arr[low];
        return -1
    }
    // more than one element left
    let mid = Math.floor((low + high)/2);
    // check if value is in the array
    if (arr[0] === value || arr[mid] === value || arr[high] === value) return value;
    if (arr[mid] < value){
        return Math.max(arr[mid], findFloor(arr, value, mid+1, high))
    } else {
        return findFloor(arr, value, low, mid - 1)
    }
}

module.exports = findFloor