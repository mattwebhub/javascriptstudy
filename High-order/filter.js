/**
 * Employee Search
 * Given the person's name, find it's role in a company
 * let employees = [ {firstName: "Dipper", lastName: "Pines", role: "Boss"}, ...... ]
 * @param {string} name
 */
const findEmployeesRole = name => {
  const names = name.split(" ");
  const foundEmployees = employees.filter(
    x => x.firstName == names[0] && x.lastName == names[1]
  );

  return foundEmployees.length != 1
    ? "Does not work here!"
    : foundEmployees[0].role;
};
/**
 * Partial search
 * Write a method that will search an array of strings for all strings that contain another string,
 * ignoring capitalization.
 * Then return an array of the found strings.
 * If the string to search for is "me", and the array to search is
 * ["home", "milk", "Mercury", "fish"], the method should return ["home", "Mercury"].
 * @param {*} query
 * @param {*} seq
 */
const wordSearch = (query, seq) =>
  (q => (q.length ? q : ["Empty"]))(
    seq.filter(x => x.toLowerCase().includes(query.toLowerCase()))
  );

//The filter() method returns a new array created from all elements that pass a certain test preformed on an original array.
//Here’s what the syntax looks like:
let newArr = oldArr.filter(callback);

// ### findLast

// Returns the last element for which the provided function returns a truthy value.

// Use `Array.prototype.filter()` to remove elements for which `fn` returns falsey values, `Array.prototype.pop()` to get the last one.

const findLast = (arr, fn) => arr.filter(fn).pop();

findLast([1, 2, 3, 4], n => n % 2 === 1); // 3
/**
 * Write an algorithm that takes an array and moves all of the zeros to the end, 
 * preserving the order of the other elements.
 * @param {*} withZeroes 
 */
const moveZeros = function (withZeroes) {
  let noZeros = withZeroes.filter(c => c !== 0)      // Filters off 0`s
  let lengthDif = withZeroes.length - noZeros.length // Difference between zeros and no zeros
  
  return noZeros.concat(Array(lengthDif).fill(0))    // Concat `noZeros` with a created array
                                                     // of length `dif` and fill it with 0`s
}
// moveZeros([false,1,0,1,2,0,1,3,"a"]) // returns[false,1,1,2,1,3,"a",0,0]

/**
 * Given an array of integers, remove the smallest value.
 * Do not mutate the original array/list.
 * If there are multiple elements with the same value, remove the one with a lower index.
 * If you get an empty array/list, return an empty array/list.
 * @param {*} numbers
 */
const removeSmallest = numbers => {
  numbers.filter((n, i) => {
    i !== numbers.indexOf(Math.min(...numbers));
  });
};

// ### compact

// Removes falsey values from an array.

// Use `Array.prototype.filter()` to filter out falsey values (`false`, `null`, `0`, `""`, `undefined`, and `NaN`).

const compact = arr => arr.filter(Boolean);

compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]); // [ 1, 2, 3, 'a', 's', 34 ]

// ### intersection

// Returns a list of elements that exist in both arrays.

// Create a `Set` from `b`, then use `Array.prototype.filter()` on `a` to only keep values contained in `b`.

const intersection = (a, b) => {
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

intersection([1, 2, 3], [4, 3, 2]); // [2, 3]

// ### intersectionBy

// Returns a list of elements that exist in both arrays, after applying the provided function to each array element of both.

// Create a `Set` by applying `fn` to all elements in `b`, then use `Array.prototype.filter()` on `a` to only keep elements,
//which produce values contained in `b` when `fn` is applied to them.

const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.filter(x => s.has(fn(x)));
};

intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]

// ### intersectionWith

// Returns a list of elements that exist in both arrays, using a provided comparator function.

// Use `Array.prototype.filter()` and `Array.prototype.findIndex()` in combination with the provided comparator to determine intersecting values.

const intersectionWith = (a, b, comp) =>
  a.filter(x => b.findIndex(y => comp(x, y)) !== -1);

intersectionWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1.5, 3, 0]

// ### similarity

// Returns an array of elements that appear in both arrays.

const similarity = (arr, values) => arr.filter(v => values.includes(v));

similarity([1, 2, 3], [1, 2, 4]); // [1, 2]

// ### symmetricDifference

// Returns the symmetric difference between two arrays, without filtering out duplicate values.

// Create a `Set` from each array, then use `Array.prototype.filter()` on each of them to only keep values not contained in the other.

const symmetricDifference = (a, b) => {
  const sA = new Set(a),
    sB = new Set(b);
  return [...a.filter(x => !sB.has(x)), ...b.filter(x => !sA.has(x))];
};

symmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
symmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 2, 3]

// ### without

// Filters out the elements of an array, that have one of the specified values.

// Use `Array.prototype.filter()` to create an array excluding(using `!Array.includes()`) all given values.

// _(For a snippet that mutates the original array see [`pull`](#pull))_

const without = (arr, ...args) => arr.filter(v => !args.includes(v));

without([2, 1, 2, 3], 1, 2); // [3]

// ### words

// Converts a given string into an array of words.

// Use `String.prototype.split()` with a supplied pattern (defaults to non-alpha as a regexp) to convert to an array of strings.
//Use `Array.prototype.filter()` to remove any empty strings.
// Omit the second argument to use the default regexp.

const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);

words("I love javaScript!!"); // ["I", "love", "javaScript"]
words("python, javaScript & coffee"); // ["python", "javaScript", "coffee"]

// ### symmetricDifferenceBy

// Returns the symmetric difference between two arrays, after applying the provided function to each array element of both.

// Create a `Set` by applying `fn` to each array's elements, then use `Array.prototype.filter()` on each of them to only keep values not contained in the other.

const symmetricDifferenceBy = (a, b, fn) => {
  const sA = new Set(a.map(v => fn(v))),
    sB = new Set(b.map(v => fn(v)));
  return [...a.filter(x => !sB.has(fn(x))), ...b.filter(x => !sA.has(fn(x)))];
};

symmetricDifferenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [ 1.2, 3.4 ]

// ### symmetricDifferenceWith

// Returns the symmetric difference between two arrays, using a provided function as a comparator.

// Use `Array.prototype.filter()` and `Array.prototype.findIndex()` to find the appropriate values.

const symmetricDifferenceWith = (arr, val, comp) => [
  ...arr.filter(a => val.findIndex(b => comp(a, b)) === -1),
  ...val.filter(a => arr.findIndex(b => comp(a, b)) === -1)
];

symmetricDifferenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0, 3.9],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2, 3.9]

// ### uniqueSymmetricDifference

// Returns the unique symmetric difference between two arrays, not containing duplicate values from either array.

// Use `Array.prototype.filter()` and `Array.prototype.includes()` on each array to remove values contained in the other,
// then create a `Set` from the results, removing duplicate values.

const uniqueSymmetricDifference = (a, b) => [
  ...new Set([
    ...a.filter(v => !b.includes(v)),
    ...b.filter(v => !a.includes(v))
  ])
];

uniqueSymmetricDifference([1, 2, 3], [1, 2, 4]); // [3, 4]
uniqueSymmetricDifference([1, 2, 2], [1, 3, 1]); // [2, 3]

// ### reject

// Takes a predicate and array, like `Array.prototype.filter()`, but only keeps `x` if `pred(x) === false`.

const reject = (pred, array) => array.filter((...args) => !pred(...args));

reject(x => x % 2 === 0, [1, 2, 3, 4, 5]); // [1, 3, 5]
reject(word => word.length > 4, ["Apple", "Pear", "Kiwi", "Banana"]); // ['Pear', 'Kiwi']

// ### difference

// Returns the difference between two arrays.

// Create a `Set` from `b`, then use `Array.prototype.filter()` on `a` to only keep values not contained in `b`.

const difference = (a, b) => {
  const s = new Set(b);
  return a.filter(x => !s.has(x));
};

difference([1, 2, 3], [1, 2, 4]); // [3]

// ### differenceBy

// Returns the difference between two arrays, after applying the provided function to each array element of both.

// Create a `Set` by applying `fn` to each element in `b`, then use `Array.prototype.filter()` in combination with `fn` on `a` to only keep values not contained in the previously created set.

const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(v => fn(v)));
  return a.filter(x => !s.has(fn(x)));
};

differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1.2]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], v => v.x); // [ { x: 2 } ]

// ### differenceWith

// Filters out all values from an array for which the comparator function does not return `true`.

// Use `Array.prototype.filter()` and `Array.prototype.findIndex()` to find the appropriate values.

const differenceWith = (arr, val, comp) =>
  arr.filter(a => val.findIndex(b => comp(a, b)) === -1);

differenceWith(
  [1, 1.2, 1.5, 3, 0],
  [1.9, 3, 0],
  (a, b) => Math.round(a) === Math.round(b)
); // [1, 1.2]

// ### everyNth

// Returns every nth element in an array.

// Use `Array.prototype.filter()` to create a new array that contains every nth element of a given array.

const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);

everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]

// ### filterNonUnique

// Filters out the non-unique values in an array.

const filterNonUnique = arr =>
  arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i));

filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]

// ### filterNonUniqueBy

// Filters out the non-unique values in an array, based on a provided comparator function.

// Use `Array.prototype.filter()` and `Array.prototype.every()` for an array containing only the unique values, based on the comparator function, `fn`.
// The comparator function takes four arguments: the values of the two elements being compared and their indexes.

const omitBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => !fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

omitBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { b: '2' }

const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter(k => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

pickBy({ a: 1, b: "2", c: 3 }, x => typeof x === "number"); // { 'a': 1, 'c': 3 }

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

const nest = (items, id = null, link = "parent_id") =>
  items
    .filter(item => item[link] === id)
    .map(item => ({ ...item, children: nest(items, item.id) }));

// One top level comment
const comments = [
  { id: 1, parent_id: null },
  { id: 2, parent_id: 1 },
  { id: 3, parent_id: 1 },
  { id: 4, parent_id: 2 },
  { id: 5, parent_id: 4 }
];
const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]

const get = (from, ...selectors) =>
  [...selectors].map(s =>
    s
      .replace(/\[([^\[\]]*)\]/g, ".$1.")
      .split(".")
      .filter(t => t !== "")
      .reduce((prev, cur) => prev && prev[cur], from)
  );

const obj = {
  selector: { to: { val: "val to select" } },
  target: [1, 2, { a: "test" }]
};
get(obj, "selector.to.val", "target[0]", "target[2].a"); // ['val to select', 1, 'test']

const findLastIndex = (arr, fn) =>
  arr
    .map((val, i) => [i, val])
    .filter(([i, val]) => fn(val, i, arr))
    .pop()[0];

findLastIndex([1, 2, 3, 4], n => n % 2 === 1); // 2 (index of the value 3)

const factors = (num, primes = false) => {
  const isPrime = num => {
    const boundary = Math.floor(Math.sqrt(num));
    for (var i = 2; i <= boundary; i++) if (num % i === 0) return false;
    return num >= 2;
  };
  const isNeg = num < 0;
  num = isNeg ? -num : num;
  let array = Array.from({ length: num - 1 })
    .map((val, i) => (num % (i + 2) === 0 ? i + 2 : false))
    .filter(val => val);
  if (isNeg)
    array = array.reduce((acc, val) => {
      acc.push(val);
      acc.push(-val);
      return acc;
    }, []);
  return primes ? array.filter(isPrime) : array;
};

factors(12); // [2,3,4,6,12]
factors(12, true); // [2,3]
factors(-12); // [2, -2, 3, -3, 4, -4, 6, -6, 12, -12]
factors(-12, true); // [2,3]

const formatDuration = ms => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time)
    .filter(val => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'

const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

filterNonUniqueBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]
