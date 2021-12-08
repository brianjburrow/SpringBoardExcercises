def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    translator = {to_swap.upper(): to_swap.lower(),
                  to_swap.lower(): to_swap.upper()}

    def swapper(char):
        try:
            return translator[char]
        except Exception as e:
            # print(e)
            return char

    return ''.join(map(swapper, list(phrase)))
