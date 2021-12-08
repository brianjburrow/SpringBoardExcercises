def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?

        >>> same_frequency(551122, 221515)
        True

        >>> same_frequency(321142, 3212215)
        False

        >>> same_frequency(1212, 2211)
        True
    """
    sL = set(str(num1))
    sR = set(str(num2))
    countLeft = dict(zip(sL, [0]*len(sL)))
    countRight = dict(zip(sR, [0]*len(sR)))
    if sL != sR:
        # don't even contain the same elements
        # skip doing any looping
        return False
    for val in sL:
        countLeft[val] += 1
    for val in sR:
        countRight[val] += 1
    if countLeft == countRight:
        return True
    return False
