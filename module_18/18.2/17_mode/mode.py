def mode(nums):
    """Return most-common number in list.

    For this function, there will always be a single-most-common value;
    you do not need to worry about handling cases where more than one item
    occurs the same number of times.

        >>> mode([1, 2, 1])
        1

        >>> mode([2, 2, 3, 3, 2])
        2
    """
    uniques = dict.fromkeys(set(nums), 0)
    maxCount = 0
    maxVal = -1e10
    for num in nums:
        uniques[num] += 1
        if uniques[num] > maxCount:
            maxCount = uniques[num]
            maxVal = num
    return maxVal
