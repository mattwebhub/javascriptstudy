/**
 * Who is online?
 * You want to show your users which of their friends are online and available to chat!
 * Given an input of an array of objects containing usernames, status and time since last activity (in mins), 
 * create a function to work out who is online, offline and away.
 * If someone is online but their lastActivity was more than 10 minutes ago they are to be considered away.
 * @param {*} friends
 */
const whosOnline = friends =>
  [
    [
      "online",
      friend => friend.status === "online" && friend.lastActivity <= 10
    ],
    ["away", friend => friend.status === "online" && friend.lastActivity > 10],
    ["offline", friend => friend.status === "offline"]
  ]
    .map(([status, func]) => [
      status,
      friends.filter(func).map(friend => friend.username)
    ])
    .reduce((result, [status, array]) => {
      if (array.length) result[status] = array;
      return result;
    }, {});

/**
 * Another solution...
 */

const whosOnline = friends =>
  friends.reduce((a, { username, status, lastActivity }) => {
    const fStatus = status === "online" && lastActivity > 10 ? "away" : status;
    a[fStatus] ? a[fStatus].push(username) : (a[fStatus] = [username]);
    return a;
  }, {});       // Very interesting this one!
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
 * Creates an array of arrays, ungrouping the elements in an array produced by [zip](#zip).
 * Use `Math.max.apply()` to get the longest subarray in the array, `Array.prototype.map()` to make each element an array.
 * Use `Array.prototype.reduce()` and `Array.prototype.forEach()` to map grouped values to individual arrays.
 * @param {*} arr
 */
const unzip = arr =>
  arr.reduce(
    (acc, val) => (val.forEach((v, i) => acc[i].push(v)), acc), // note: is forEach mutating?
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
