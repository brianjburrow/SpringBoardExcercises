def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    countOpen = 0
    countClose = 0
    for symbol in parens:
        if symbol == "(":
            countOpen += 1
        else:
            countClose += 1
        if countClose > countOpen:
            return False
    if countOpen != countClose:
        return False
    return True
