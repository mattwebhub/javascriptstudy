/**
 * DEFINITION
 * Reduce (aka: fold, accumulate) utility commonly used in functional programming that lets you iterate over a list,
 * applying a function to an accumulated value and the next item in the list, until the iteration is complete and
 * the accumulated value gets returned. Many useful things can be implemented with reduce.
 * Frequently, it’s the most elegant way to do any non-trivial processing on a collection of items.
 */

`array.reduce(
    reducer: (accumulator: Any, current: Any) => Any,
    initialValue: Any
  ) => accumulator: Any
 `;
/**
 * Let's sum an array...
 */

const total = [0, 1, 2, 3].reduce((sum, value) => sum + value, 1);
// Total is 7

/**
 * For each element in the array, the reducer is called and passed the accumulator and the current value.
 * The reducer’s job is to “fold” the current value into the accumulated value somehow.
 * How is not specified, and specifying how is the purpose of the reducer function.
 * The reducer returns the new accumulated value, and reduce() moves on to the next value in the array.
 * The reducer may need an initial value to start with, so most implementations take an initial value as a parameter.
 */

/**
 * In the case of this summing reducer, the first time the reducer is called,
 * acc starts at 1 (the value we passed to .reduce() as the second parameter).
 * The reducer returns 1 + 0 (0 was the first element in the array), which is 1.
 * For the next call, acc = 1, n = 1 and the reducer returns the result of 1 + 1 (2).
 * In the last iteration, acc = 4, n = 3, and the reducer returns 7. Since the iteration is finished,
 * .reduce() returns the final accumulated value, 7.
 */

/**
 * What I noticed happening with developers and reduce is that they either don’t need to sum up some numbers so they forget reduce
 * exists or they remember reduce exists only when they need to sum up some numbers but ( as was implied before )
 * reduce can do so much more than just sum stuff.
 * The really cool thing about reduce is that it passes the result of one callback function invocation
 * to the next one allowing us to do some crazy ass shenanigans like…
 */

/**
 * As you're about to see on the next examples, we can mix it with other functions such as `map()`, `filter()`, `forEach`, `Promises`
 * and so on... I've grouped down examples from the 30-seconds of code repository on github, they're very powerful, try to see
 * if you can understand the code before reading it's description
 */
/**
 * Examples
 */
/**
 * Count elements in an array
 * @param {*} arr
 */
const count = arr =>
  arr.reduce(
    (acc, val) => (
      acc[val] // Does accumulated value matches this next element?
        ? acc[val]++ // If so, add one
        : (acc[val] = 1), // Otherwise return the current value or default value of 1
      acc
    ),
    {}  // or empty array if given array is empty
  ); 
  
/**
 * Given an array of integers, find the maximum product obtained from multiplying 2 adjacent numbers in the array.
 * @param {*} array
 */
const adjacentElementsProduct = array =>
  Math.max(...array.map((el, i) => el * array[i + 1]).slice(0, -1));
// adjacentElementsProduct([1,2,3])  ==>  return 6

/**
 * Consider the string "1 2 36 4 8". We want to take pairs of these numbers,
 * concatenate each pair and determine how many of them of divisible by k.
 *
 * @param {*} s
 * @param {*} k
 */
function solve(s, k) {
  return s
    .split(" ")
    .reduce(
      (acc, e, i, arr) =>
        acc.concat(
          arr.filter((f, j) => (e + f) % k === 0 && i != j).map(f => e + f)
        ),
      []
    ).length;
}
solve("1 2 36 4 8", 3); //  8, because they are ['12', '18', '21', '24', '42', '48', '81', '84']
solve("1 3 6 3", 3); //  6, They are ['36', '33', '63', '63', '33', '36']

/**
 * unflatten
 *  So you have to build a method, that creates new arrays, that can be flattened!
You get an array of integers and have to unflatten it by these rules:



- You start at the first number.
- If this number x is smaller than 3, take this number x direct 
  for the new array and continue with the next number.
- If this number x is greater than 2, take the next x numbers (inclusive this number) as a 
  sub-array in the new array. Continue with the next number AFTER this taken numbers.
- If there are too few numbers to take by number, take the last available numbers.
 */
const unflatten = flatArray =>
  flatArray.reduce(
    (unflat, item, index, arr) => (
      item < 3 ? unflat.push(item) : unflat.push(arr.splice(index, item, null)),
      unflat
    ),
    []
  );
/**
 * Count
 * count all the occuring characters(UTF-8) in string.
 * If you have string like this aba then the result should be { 'a': 2, 'b': 1 }
 * @param {*} string
 */
const count = string =>
  string
    .split("")
    .reduce((acc, val) => (acc[val] ? acc[val]++ : (acc[val] = 1), acc), {});
/**
 * 1.1 - Returns the average of two or more numbers.
 * Use `Array.prototype.reduce()` to add each value to an accumulator,
 * initialized with a value of `0`, divide by the `length` of the array.
 * @param  {...any} nums
 */

const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2

/**
 * 1.2 - Multiply elements in an array
 * obs: In here we don't want to pass the initial value as 0 otherwise the multiply would become 0
 * @param  {...any} nums
 */
const multiply = (...nums) => nums.reduce((acc, val) => acc * val, 1);

/**
 * 1.3 - Counts the occurrences of a value in an array.
 * Use `Array.prototype.reduce()` to increment a counter each time you encounter the specific value inside the array.
 * @param {*} arr
 * @param {*} val
 */
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3

/**
 * Given an array of valid property identifiers and an array of values, return an object associating the properties to the values.
 * Since an object can have undefined values but not undefined property pointers, the array of properties is used to decide the structure of the resulting object using `Array.prototype.reduce()`.
 * @param {*} props
 * @param {*} values
 */
const zipObject = (props, values) =>
  props.reduce((obj, prop, index) => ((obj[prop] = values[index]), obj), {});

zipObject(["a", "b", "c"], [1, 2]); // {a: 1, b: 2, c: undefined}
zipObject(["a", "b"], [1, 2, 3]); // {a: 1, b: 2}

/**
 * 1.6 - Returns all indices of `val` in an array.
 * If `val` never occurs, returns `[]`.
 * Use `Array.prototype.reduce()` to loop over elements and store indices for matching elements.
 * Return the array of indices.
 * @param {*} arr
 * @param {*} val
 */
const indexOfAll = (arr, val) =>
  arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

indexOfAll([1, 2, 3, 1, 2, 3], 1); // [0,3]
indexOfAll([1, 2, 3], 4); // []
/**
 * 1.5 - Calculates the greatest common divisor between two or more numbers/arrays.
 * The inner `_gcd` function uses recursion.
 * Base case is when `y` equals `0`. In this case, return `x`.
 * Otherwise, return the GCD of `y` and the remainder of the division `x/y`.
 * @param  {...any} arr
 */
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y));
  return [...arr].reduce((a, b) => _gcd(a, b));
};

gcd(8, 36); // 4
gcd(...[12, 8, 32]); // 4

/**
 * 1.6 - Returns the least common multiple of two or more numbers.
 * Use the greatest common divisor (GCD) formula and the fact that `lcm(x,y) = x * y / gcd(x,y)` to determine the least common multiple.
 * The GCD formula uses recursion.
 * @param  {...any} arr
 */
const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

lcm(12, 7); // 84
lcm(...[1, 3, 4, 5]); // 60

/**
 * 1.7 - Takes any number of iterable objects or objects with a `length` property and returns the longest one.
 * If multiple objects have the same length, the first one will be returned.
 * Returns `undefined` if no arguments are provided.
 * Use `Array.prototype.reduce()`, comparing the `length` of objects to find the longest one.
 * @param {*} val
 * @param  {...any} vals
 */
const longestItem = (val, ...vals) =>
  [val, ...vals].reduce((a, x) => (x.length > a.length ? x : a));

longestItem("this", "is", "a", "testcase"); // 'testcase'
longestItem(...["a", "ab", "abc"]); // 'abc'
longestItem(...["a", "ab", "abc"], "abcd"); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], "foobar"); // 'foobar'

/**
 * Uses the percentile formula to calculate how many numbers in the given array are less or equal to the given value.
 * Use `Array.prototype.reduce()` to calculate how many numbers are below the value and how many are the same value and apply the percentile formula.
 * @param {*} arr
 * @param {*} val
 */
const percentile = (arr, val) =>
  (100 *
    arr.reduce(
      (acc, v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0),
      0
    )) /
  arr.length;

percentile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6); // 55

/**
 *  Picks the key-value pairs corresponding to the given keys from an object.
 *  Use `Array.prototype.reduce()` to convert the filtered/picked keys back to an object with the corresponding
 *  key-value pairs if the key exists in the object.
 * @param {*} obj
 * @param {*} arr
 */
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

pick({ a: 1, b: "2", c: 3 }, ["a", "c"]); // { 'a': 1, 'c': 3 }

/**
 * Determines if the `pattern` matches with `str`.
 * Use `String.toLowerCase()` to convert both strings to lowercase, then loop through `str` and determine if it contains
 * all characters of `pattern` and in the correct order.
 * @param {*} pattern
 * @param {*} str
 */
const isSimilar = (pattern, str) =>
  [...str].reduce(
    (matchIndex, char) =>
      char.toLowerCase() === (pattern[matchIndex] || "").toLowerCase()
        ? matchIndex + 1
        : matchIndex,
    0
  ) === pattern.length;

isSimilar("rt", "Rohit"); // true
isSimilar("tr", "Rohit"); // false

/**
 * Returns the minimum/maximum value of an array, after applying the provided function to set comparing rule.
 * Use `Array.prototype.reduce()` in combination with the `comparator` function to get the appropriate element in the array.
 * You can omit the second parameter, `comparator`, to use the default one that returns the minimum element in the array.
 * @param {*} arr
 * @param {*} comparator
 */
const reduceWhich = (arr, comparator = (a, b) => a - b) =>
  arr.reduce((a, b) => (comparator(a, b) >= 0 ? b : a));

reduceWhich([1, 3, 2]); // 1
reduceWhich([1, 3, 2], (a, b) => b - a); // 3
reduceWhich(
  [
    { name: "Tom", age: 12 },
    { name: "Jack", age: 18 },
    { name: "Lucy", age: 9 }
  ],
  (a, b) => a.age - b.age
); // {name: "Lucy", age: 9}

/**
 * Applies a function against an accumulator and each key in the object (from left to right).
 * Use `Object.keys(obj)` to iterate over each key in the object, `Array.prototype.reduce()`
 * to call the apply the specified function against the given accumulator.
 * @param {*} obj
 * @param {*} fn
 * @param {*} acc
 */
const transform = (obj, fn, acc) =>
  Object.keys(obj).reduce((a, k) => fn(a, obj[k], k, obj), acc);

transform(
  { a: 1, b: 2, c: 1 },
  (r, v, k) => {
    (r[v] || (r[v] = [])).push(k);
    return r;
  },
  {}
); // { '1': ['a', 'c'], '2': ['b'] }

/**
 * Creates a new object from the specified object, where all the keys are in lowercase.
 * Use `Object.keys()` and `Array.prototype.reduce()` to create a new object from the specified object.
 * Convert each key in the original object to lowercase, using `String.toLowerCase()`.
 * @param {*} obj
 */
const lowercaseKeys = obj =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

const myObj = { Name: "Adam", sUrnAME: "Smith" };
const myObjLower = lowercaseKeys(myObj); // {name: 'Adam', surname: 'Smith'};

/**
 * Replaces the names of multiple object keys with the values provided.
 * Use `Object.keys()` in combination with `Array.prototype.reduce()`
 * and the spread operator (`...`) to get the object's keys and rename them according to `keysMap`.
 * @param {*} keysMap
 * @param {*} obj
 */
const renameKeys = (keysMap, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] }
    }),
    {}
  );

const obj = { name: "Bobo", job: "Front-End Master", shoeSize: 100 };
renameKeys({ name: "firstName", job: "passion" }, obj); // { firstName: 'Bobo', passion: 'Front-End Master', shoeSize: 100 }

/**
 * Creates an object with keys generated by running the provided function for each key and the same values as the provided object.
 * Use `Object.keys(obj)` to iterate over the object's keys.
 * Use `Array.prototype.reduce()` to create a new object with the same values and mapped keys using `fn`.
 * @param {*} obj
 * @param {*} fn
 */
const mapKeys = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[fn(obj[k], k, obj)] = obj[k];
    return acc;
  }, {});

mapKeys({ a: 1, b: 2 }, (val, key) => key + val); // { a1: 1, b2: 2 }

/**
 * Performs left-to-right function composition.
 * Use `Array.prototype.reduce()` with the spread operator (`...`) to perform left-to-right function composition.
 * The first (leftmost) function can accept one or more arguments; the remaining functions must be unary.
 * @param  {...any} fns
 */
const pipeFunctions = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)));

const add5 = x => x + 5;
const multiply = (x, y) => x * y;
const multiplyAndAdd5 = pipeFunctions(multiply, add5);
multiplyAndAdd5(5, 2); // 15

/**
 * Creates an object with the same keys as the provided object and values generated by running the provided function for each value.
 * Use `Object.keys(obj)` to iterate over the object's keys.
 * Use `Array.prototype.reduce()` to create a new object with the same keys and mapped values using `fn`.
 * @param {*} obj
 * @param {*} fn
 */
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

const users = {
  fred: { user: "fred", age: 40 },
  pebbles: { user: "pebbles", age: 1 }
};
mapValues(users, u => u.age); // { fred: 40, pebbles: 1 }

/**
 * 1. - Joins all elements of an array into a string and returns this string.
 * Uses a separator and an end separator.
 * Use `Array.prototype.reduce()` to combine elements into a string.
 * Omit the second argument, `separator`, to use a default separator of `','`.
 * Omit the third argument, `end`, to use the same value as `separator` by default.
 * @param {*} arr
 * @param {*} separator
 * @param {*} end
 */
const join = (arr, separator = ",", end = separator) =>
  arr.reduce(
    (acc, val, i) =>
      i === arr.length - 2
        ? acc + val + end
        : i === arr.length - 1
          ? acc + val
          : acc + val + separator,
    ""
  );

join(["pen", "pineapple", "apple", "pen"], ",", "&"); // "pen,pineapple,apple&pen"
join(["pen", "pineapple", "apple", "pen"], ","); // "pen,pineapple,apple,pen"
join(["pen", "pineapple", "apple", "pen"]); // "pen,pineapple,apple,pen"

/**
 * Hashes the input string into a whole number.
 * Use `String.prototype.split('')` and `Array.prototype.reduce()` to create a hash of the input string, utilizing bit shifting.
 * @param {*} str
 */
const sdbm = str => {
  let arr = str.split("");
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};
sdbm("name"); // -3521204949

/**
 * Reduce, filter and/or push
 */

/**
 * Inverts the key-value pairs of an object, without mutating it. The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. If a function is supplied, it is applied to each inverted key.
 * Use `Object.keys()` and `Array.prototype.reduce()` to invert the key-value pairs of an object and apply the function provided (if any).
 * Omit the second argument, `fn`, to get the inverted keys without applying a function to them.
 * @param {*} obj
 * @param {*} fn
 */
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});

invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => "group" + value); // { group1: [ 'a', 'c' ], group2: [ 'b' ] }

/**
 * Groups the elements into two arrays, depending on the provided function's truthiness for each element.
 * Use `Array.prototype.reduce()` to create an array of two arrays.
 * Use `Array.prototype.push()` to add elements for which `fn` returns `true` to the first array and elements for which `fn` returns `false` to the second one.
 * @param {*} arr
 * @param {*} fn
 */
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true }
];
partition(users, o => o.active); // [[{ 'user': 'fred',    'age': 40, 'active': true }],[{ 'user': 'barney',  'age': 36, 'active': false }]]
