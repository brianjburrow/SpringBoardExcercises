def find_factors(num):
    """Find factors of num, in increasing order.

    >>> find_factors(10)
    [1, 2, 5, 10]

    >>> find_factors(11)
    [1, 11]

    >>> find_factors(111)
    [1, 3, 37, 111]

    >>> find_factors(321421)
    [1, 293, 1097, 321421]
    """
    result = []
    for i in range(1, round(num/2)):
        if num % i == 0:
            # is a factor
            result.append(i)
            result.append(int(num / i))
    result = list(set(result))
    result.sort()
    return result
