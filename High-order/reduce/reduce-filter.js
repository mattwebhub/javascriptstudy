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
