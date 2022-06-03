function swap (array, i, j){
    [array[i], array[j]] = [array[j], array[i]];
}
function bubbleSort(array) {
    for (let i = array.length; i > 0; i--){
        for (let j = 0; j < i - 1; j++){
            if (array[j] > array[j+1]){
                swap(array, j, j+1);
            }
        }
    }
    return array;
}

module.exports = bubbleSort;