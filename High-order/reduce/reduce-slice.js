/**
 * Reduce and slice
 */

/**
 * Create a function that returns the sum of the two lowest positive numbers given an array of minimum 4 integers.
 *  No floats or empty arrays will be passed.
 * For example, when an array is passed like [19, 5, 42, 2, 77], the output should be 7.
 * @param {*} numbers
 */
const sumTwoSmallestNumbers = numbers => {
  numbers
    .sort((x, y) => x - y)
    .slice(0, 2)
    .reduce((x, y) => x + y);
};
/**
 * Applies a function against an accumulator and each element in the array (from left to right),
 * returning an array of successively reduced values.
 * Use `Array.prototype.reduce()` to apply the given function to the given array, storing each new result.
 * @param {*} arr
 * @param {*} fn
 * @param {*} acc
 */
const reduceSuccessive = (arr, fn, acc) =>
  arr.reduce(
    (res, val, i, arr) => (res.push(fn(res.slice(-1)[0], val, i, arr)), res),
    [acc]
  );

reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0); // [0, 1, 3, 6, 10, 15, 21]

/**
 * Uncurries a function up to depth `n`.
 * Return a variadic function.
 * Use `Array.prototype.reduce()` on the provided arguments to call each subsequent curry level of the function.
 * If the `length` of the provided arguments is less than `n` throw an error.
 * Otherwise, call `fn` with the proper amount of arguments, using `Array.prototype.slice(0, n)`.Omit the second argument,
 * `n`, to uncurry up to depth `1`.
 * @param {*} fn
 * @param {*} n
 */
const uncurry = (fn, n = 1) => (...args) => {
  const next = acc => args => args.reduce((x, y) => x(y), acc);
  if (n > args.length) throw new RangeError("Arguments too few!");
  return next(fn)(args.slice(0, n));
};

const add = x => y => z => x + y + z;
const uncurriedAdd = uncurry(add, 3);
uncurriedAdd(1, 2, 3); // 6

/**
 * ⚠️ **WARNING**: This function's execution time increases exponentially with each character. Anything more than 8 to 10 characters will cause your browser to hang as it tries to solve all the different combinations.
 * Generates all permutations of a string (contains duplicates).
 * Use recursion.
 * For each letter in the given string, create all the partial permutations for the rest of its letters.
 * Use `Array.prototype.map()` to combine the letter with each partial permutation, then `Array.prototype.reduce()` to combine all permutations in one array.
 * Base cases are for string `length` equal to `2` or `1`.
 * @param {*} str
 */
const stringPermutations = str => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            val => letter + val
          )
        ),
      []
    );
};

stringPermutations("abc"); // ['abc','acb','bac','bca','cab','cba']
