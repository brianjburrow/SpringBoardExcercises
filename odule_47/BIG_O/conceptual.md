NOTES: 

* It's important to have precise vocabulary about how code performs.
* It's useful for discussing tradeoffs between different approaches
* This can help you improve your code.
* Big O notation focuses on the rough trend.
* Definition

- - An algorithm is O(f(n)) if number of simple operations is eventually less than a constant times f(n), as n increases.
- - Big O is worst case time complexity when dealing with conditionals

* Simplifying Big O notation
- - Constants do not matter.
- - Smaller terms do not matter (e.g., n^2 + n = n^2).
- - Arithmetic operations are considered constant.
- - Variable assignment is constant.
- - Accessing elements in an array by index is constant, or an object by key is constant
- - Loops: length of the loop times complexity of whatever happens in the loop.


* Space Complexity
- - How much memory or storage space is needed as the size of inputs increases.
- - Rules of thumb in JS
- - - - Most primitives (booleans, numbers, undefined, null), they take constant space.
- - - - Strings : O(n) space (where n is the string length).
- - - - Reference Types: (arrays and objects) generally O(n) to store, where n is ie length of arrays (or keys in object).


Step One: Simplifying Expressions
Simplify the following big O expressions as much as possible:

- O(n + 10) -> O(n)
- O(100 * n) -> O(n)
- O(25) -> O(1)
- O(n^2 + n^3) -> O(n^3)
- O(n + n + n + n) -> O(n)
- O(1000 * log(n) + n) -> O(n)
- O(1000 * n * log(n) + n) -> O(n log(n))
- O(2^n + n^2) -> O(2^n)
- O(5 + 3 + 1) -> O(1)
- O(n + n^(1/2) + n^2 + n * log(n)^10) -> O(n^2)


Step Two: Calculating Time Complexity

-- O(n)
-- O(n)
-- O(1)
-- O(n)
-- O(n^2)
-- O(n)
-- true
-- true
-- false
-- O(n)
-- O(n)
-- O(n)
-- nlog(n)
-- O(n)
-- O(1)
-- O(n)
-- O(1)
-- O(n)
-- O(n)