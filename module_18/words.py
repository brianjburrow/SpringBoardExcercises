def print_upper_words(wordList, must_start_with = {}):
    if not must_start_with:
        # no restriction on starting letter
        [print(word.upper()) for word in wordList]
    else:
        [print(word.upper()) for word in wordList if word[0] in must_start_with]
    pass

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})