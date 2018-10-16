
/**
 * Reduce and concat
 */
/**
 * 3.0 - Create an empty array of the specific length, initializing the first two values (`0` and `1`).
 * Use `Array.prototype.reduce()` to add values into the array, using the sum of the last two values, except for the first two.
 * @param {*} n
 */
const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );

fibonacci(6); // [0, 1, 1, 2, 3, 5]

/**
 * Returns the powerset of a given array of numbers.
 * Use `Array.prototype.reduce()` combined with `Array.prototype.map()` to iterate over elements
 * and combine into an array containing all combinations.
 * @param {*} arr
 */
const powerset = arr =>
  arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]]);

powerset([1, 2]); // [[], [1], [2], [2, 1]]

/**
 * Creates a new array out of the two supplied by creating each possible pair from the arrays.
 * Use `Array.prototype.reduce()`, `Array.prototype.map()` and `Array.prototype.concat()` to produce every possible pair from the
 * elements of the two arrays and save them in an array.
 * @param {*} a
 * @param {*} b
 */
const xProd = (a, b) =>
  a.reduce((acc, x) => acc.concat(b.map(y => [x, y])), []);

xProd([1, 2], ["a", "b"]); // [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]

/**
 * Returns the standard deviation of an array of numbers.
 * Use `Array.prototype.reduce()` to calculate the mean, variance and the sum of the variance of the values, the variance of the values, then
 * determine the standard deviation.
 * You can omit the second argument to get the sample standard deviation or set it to `true` to get the population standard deviation.
 * @param {*} arr
 * @param {*} usePopulation
 */
const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true); // 12.29899614287479 (population)

/**
 * 3.1 - Flattens an array up to the specified depth.
 * Use recursion, decrementing `depth` by 1 for each level of depth.
 * Use `Array.prototype.reduce()` and `Array.prototype.concat()` to merge elements or arrays.
 * Base case, for `depth` equal to `1` stops recursion.
 * Omit the second argument, `depth` to flatten only to a depth of `1` (single flatten).
 * @param {*} arr
 * @param {*} depth
 */
const flatten = (arr, depth = 1) =>
  arr.reduce(
    (a, v) =>
      a.concat(depth > 1 && Array.isArray(v) ? flatten(v, depth - 1) : v),
    []
  );

flatten([1, [2], 3, 4]); // [1, 2, 3, 4]
flatten([1, [2, [3, [4, 5], 6], 7], 8], 2); // [1, 2, 3, [4, 5], 6, 7, 8]

/**
 * Creates a new object from the combination of two or more objects.
 * Use `Array.prototype.reduce()` combined with `Object.keys(obj)` to iterate over all objects and keys.
 * Use `hasOwnProperty()` and `Array.prototype.concat()` to append values for keys existing in multiple objects.
 * @param  {...any} objs
 */
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: "foo"
};
merge(object, other); // { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }

/**
 * Remove function
 * Removes elements from an array for which the given function returns `false`.
 * Use `Array.prototype.filter()` to find array elements that return truthy values and `Array.prototype.reduce()` to remove elements using `Array.prototype.splice()`.
 * The `func` is invoked with three arguments (`value, index, array`).
 * @param {*} arr
 * @param {*} func
 */
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]

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

/**
 * Remove function
 * Removes elements from an array for which the given function returns `false`.
 * Use `Array.prototype.filter()` to find array elements that return truthy values and `Array.prototype.reduce()` to remove elements using `Array.prototype.splice()`.
 * The `func` is invoked with three arguments (`value, index, array`).
 * @param {*} arr
 * @param {*} func
 */
const remove = (arr, func) =>
  Array.isArray(arr)
    ? arr.filter(func).reduce((acc, val) => {
        arr.splice(arr.indexOf(val), 1);
        return acc.concat(val);
      }, [])
    : [];
remove([1, 2, 3, 4], n => n % 2 === 0); // [2, 4]
