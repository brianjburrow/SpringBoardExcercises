"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start):
        self.value = start
        self.increment = 0
        pass

    def __repr__(self):
        return f"SerialGenerator({self.value})"

    def __str__(self):
        return f"SerialGenerator with starting value {self.value} and current increment {self.increment}"

    def generate(self):
        '''Returns the next number in a series, beginning with the starting value'''
        self.increment += 1
        return self.value + self.increment - 1

    def reset(self):
        '''Resets the series to the starting value'''
        self.increment = 0
