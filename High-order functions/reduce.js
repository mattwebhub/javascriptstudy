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
 * Count
 * count all the occuring characters(UTF-8) in string. 
 * If you have string like this aba then the result should be { 'a': 2, 'b': 1 }
 * @param {*} string 
 */
const count =
  string =>
    string.split("").reduce(
      (acc, val) => (acc[val] ? (acc[val]++) : (acc[val]=1), acc),
      {}
    ); 
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
 * Reduce and map
 */

/**
 * 2.0 - Returns the average of an array, after mapping each element to a value using the provided function.
 * Use `Array.prototype.map()` to map each element to the value returned by `fn`,
 * `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`,
 * divide by the `length` of the array.
 * @param {*} arr
 * @param {*} fn
 */

const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;

averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], o => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5

/**
 * 2.1 - GROUPS the elements of an array based on the given function and returns the COUNT of elements in each group.
 * Use `Array.prototype.map()` to map the values of an array to a function or property name.
 * Use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.
 *
 * AGRUPAR elementos de um conjunto baseado em uma função e retornar a QUANTIDADE de elementos em cada grupo
 * Use `Array.prototype.map()` para mapear os valores do conjunto a uma funçao ou propriedade
 * Use `Array.prototype.reduce()` para criar o objeto, aonde as chaves saão produzidas a partir dos resultados mapeados
 * @param {*} arr
 * @param {*} fn
 */
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});

countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2} One element 'four', two elements 'six'. / Um elemento 'quatro' dois elementos 'seis'
countBy(["one", "two", "three"], "length"); // {3: 2, 5: 1} One element with 5 of length, two elements with 5 of length

/**
 * 2.2 - Groups the elements of an array based on the given function.
 * Use `Array.prototype.map()` to map the values of an array to a function or property name.
 * Use `Array.prototype.reduce()` to create an object, where the keys are produced from the mapped results.
 * @param {*} arr
 * @param {*} fn
 */
const groupBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : val => val[fn])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});

groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(["one", "two", "three"], "length"); // {3: ['one', 'two'], 5: ['three']}

/**
 * Maps the values of an array to an object using a function,
 * where the key-value pairs consist of the original value as the key and the mapped value.
 * Use an anonymous inner function scope to declare an undefined memory space,
 * using closures to store a return value.
 * Use a new `Array` to store the array with a map of the function over its data set and a comma operator to return a second step,
 * without needing to move from one context to another (due to closures and order of operations).
 * @param {*} arr
 * @param {*} fn
 */
const mapObject = (arr, fn) =>
  (a => (
    (a = [arr, arr.map(fn)]),
    a[0].reduce((acc, val, ind) => ((acc[val] = a[1][ind]), acc), {})
  ))();

const squareIt = arr => mapObject(arr, a => a * a);

squareIt([1, 2, 3]); // { 1: 1, 2: 4, 3: 9 }

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

/**
 * Reduce and filter
 */

/**
 * Creates an object composed of the properties the given function returns falsey for. The function is invoked with two arguments: (value, key).
 * Use `Object.keys(obj)` and `Array.prototype.filter()`to remove the keys for which `fn` returns a truthy value.
 * Use `Array.prototype.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.
 * @param {*} obj
 * @param {*} fn
 */
const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

omitBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { b: '2' }

/**
 * Creates an object composed of the properties the given function returns truthy for. The function is invoked with two arguments:
 * (value, key).
 * Use `Object.keys(obj)` and `Array.prototype.filter()`to remove the keys for which `fn` returns a falsey value.
 * Use `Array.prototype.reduce()` to convert the filtered keys back to an object with the corresponding key-value pairs.
 * @param {*} obj
 * @param {*} fn
 */
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

pickBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { 'a': 1, 'c': 3 }

/**
 * Reduce filter and map
 */
/**
 * Filter an array of objects based on a condition while also filtering out unspecified keys.
 * Use `Array.prototype.filter()` to filter the array based on the predicate `fn` so that it returns the objects for which the condition returned a truthy value.
 * On the filtered array, use `Array.prototype.map()` to return the new object using `Array.prototype.reduce()` to filter out the keys which were not supplied as the `keys` argument.
 * @param {*} data
 * @param {*} keys
 * @param {*} fn
 */
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map(el =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const data = [
  {
    id: 1,
    name: "john",
    age: 24
  },
  {
    id: 2,
    name: "mike",
    age: 50
  }
];

reducedFilter(data, ["id", "name"], item => item.age > 24); // [{ id: 2, name: 'mike'}]

/**
 * Reduce and slice
 */
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
 * Reduce filter, splice and/or slice
 */

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
 * Reduce and some
 */
/**
 * Returns all unique values of an array, based on a provided comparator function.
 * Use `Array.prototype.reduce()` and `Array.prototype.some()` for an array containing only the first unique occurence of each value,
 * based on the comparator function, `fn`.
 * The comparator function takes two arguments: the values of the two elements being compared.
 * @param {*} arr
 * @param {*} fn
 */
const uniqueElementsBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

uniqueElementsBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 1, value: 'b' }, { id: 2, value: 'c' } ]

/**
 * Returns all unique values of an array, based on a provided comparator function.
 * Use `Array.prototype.reduce()` and `Array.prototype.some()` for an array containing only the last unique occurence of each value, based on the comparator function, `fn`.
 * The comparator function takes two arguments: the values of the two elements being compared.
 * @param {*} arr
 * @param {*} fn
 */
const uniqueElementsByRight = (arr, fn) =>
  arr.reduceRight((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []);

uniqueElementsByRight(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'e' }, { id: 1, value: 'd' }, { id: 2, value: 'c' } ]
/**
 * Reduce forEach map
 */

/**
 * Creates an array of arrays, ungrouping the elements in an array produced by [zip](#zip).
 * Use `Math.max.apply()` to get the longest subarray in the array, `Array.prototype.map()` to make each element an array.
 * Use `Array.prototype.reduce()` and `Array.prototype.forEach()` to map grouped values to individual arrays.
 * @param {*} arr
 */
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
    Array.from({
      length: Math.max(...arr.map(x => x.length))
    }).map(x => [])
  );

unzip([["a", 1, true], ["b", 2, false]]); //[['a', 'b'], [1, 2], [true, false]]
unzip([["a", 1, true], ["b", 2]]); //[['a', 'b'], [1, 2], [true]]

/**
 * Creates an array of elements, ungrouping the elements in an array produced by [zip](#zip) and applying the provided function.
 * Use `Math.max.apply()` to get the longest subarray in the array, `Array.prototype.map()` to make each element an array.
 * Use `Array.prototype.reduce()` and `Array.prototype.forEach()` to map grouped values to individual arrays.
 * Use `Array.prototype.map()` and the spread operator (`...`) to apply `fn` to each individual group of elements.
 * @param {*} arr
 * @param {*} fn
 */
const unzipWith = (arr, fn) =>
  arr
    .reduce(
      (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc),
      Array.from({
        length: Math.max(...arr.map(x => x.length))
      }).map(x => [])
    )
    .map(val => fn(...val));

unzipWith([[1, 10, 100], [2, 20, 200]], (...args) =>
  args.reduce((acc, v) => acc + v, 0)
); // [3, 30, 300]

/**
 * Reduce and Promises
 */

/**
 * Runs an array of promises in series.
 * Use `Array.prototype.reduce()` to create a promise chain, where each promise returns the next promise when resolved.
 * @param {*} ps
 */
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // Executes each promise sequentially, taking a total of 3 seconds to complete

/**
 * Performs left-to-right function composition for asynchronous functions.
 * Use `Array.prototype.reduce()` with the spread operator (`...`) to perform left-to-right function composition using `Promise.then()`.
 * The functions can return a combination of: simple values, `Promise`'s, or they can be defined as `async` ones returning through `await`.
 * All functions must be unary.
 * @param  {...any} fns
 */
const pipeAsyncFunctions = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
