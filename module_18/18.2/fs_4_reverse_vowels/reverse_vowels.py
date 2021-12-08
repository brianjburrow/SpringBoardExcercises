def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = [char for char in s if char in 'aeiouAEIOU']
    vowels.reverse()
    newStr = ''
    for i in range(len(s)):
        if s[i] in 'aeiouAEIOU':
            newStr += vowels.pop(0)
        else:
            newStr += s[i]
    return newStr
