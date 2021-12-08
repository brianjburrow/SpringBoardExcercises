"""Word Finder: finds random words from a dictionary."""

from random import randint


class WordFinder:
    """
    Word Finder: finds random words from a dictionary

    Input:
    filename - str, path to dictionary

    """

    def __init__(self, filename):
        self.filename = filename
        self.readFile()
        pass

    def random(self):
        '''Generates a random word from a list of words'''

        return self.dictionary[randint(0, self.nWords - 1)]

    def readFile(self):
        '''reads a file containing a list of words, separated by a new line'''
        with open(self.filename) as file:
            self.dictionary = []
            for line in file.readlines():
                self.dictionary.append(line.replace('\n', ''))
        self.nWords = len(self.dictionary)
        print(f"{self.nWords} words read.")
        pass


class SpecialWordFinder(WordFinder):
    '''Skips lines that are blank, or lines that start with #

    Input:
    filename - str, path to dictionary

    '''

    def __init__(self, filename):
        super().__init__(filename)
        self.cleanDictionary()
        pass

    def cleanDictionary(self):
        for idx, word in enumerate(self.dictionary):
            if word == "\n" or word[0] == "#":
                self.dictionary.pop(idx)
                self.nWords -= 1
        print(f"{self.nWords} words are valid.")
