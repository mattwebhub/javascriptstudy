// ### truthCheckCollection

// Checks if the predicate (second argument) is truthy on all elements of a collection (first argument).
// Use `Array.prototype.every()` to check if each passed object has the specified property and if it returns 
//a truthy value.

const truthCheckCollection = (collection, pre) => collection.every(obj => obj[pre]);

truthCheckCollection([{ user: 'Tinky-Winky', sex: 'male' }, { user: 'Dipsy', sex: 'male' }], 'sex'); // true

// ### matchesWith

// Compares two objects to determine if the first one contains equivalent property values to the second one, 
//based on a provided function.
// Use `Object.keys(source)` to get all the keys of the second object, then `Array.prototype.every()`, 
//`Object.hasOwnProperty()` and the provided function to determine if all keys exist in the first object and 
//have equivalent values.
// If no function is provided, the values will be compared using the equality operator.

const matchesWith = (obj, source, fn) =>
  Object.keys(source).every(
    key =>
      obj.hasOwnProperty(key) && fn
        ? fn(obj[key], source[key], key, obj, source)
        : obj[key] == source[key]
  );

const isGreeting = val => /^h(?:i|ello)$/.test(val);
matchesWith(
  { greeting: 'hello' },
  { greeting: 'hi' },
  (oV, sV) => isGreeting(oV) && isGreeting(sV)
); // true

// ### matches

// Compares two objects to determine if the first one contains equivalent property values to the second one.
// Use `Object.keys(source)` to get all the keys of the second object, then `Array.prototype.every()`, 
//`Object.hasOwnProperty()` and strict comparison to determine if all keys exist in the first object and have 
//the same values.

const matches = (obj, source) =>
  Object.keys(source).every(key => obj.hasOwnProperty(key) && obj[key] === source[key]);

matches({ age: 25, hair: 'long', beard: true }, { hair: 'long', beard: true }); // true
matches({ hair: 'long', beard: true }, { age: 25, hair: 'long', beard: true }); // false

// ### hasFlags

// Check if the current process's arguments contain the specified flags.
// Use `Array.prototype.every()` and `Array.prototype.includes()` to check if `process.argv` 
// contains all the specified flags.
// Use a regular expression to test if the specified flags are prefixed with `-` or `--` and prefix them accordingly.

const hasFlags = (...flags) =>
  flags.every(flag => process.argv.includes(/^-{1,2}/.test(flag) ? flag : '--' + flag));

// node myScript.js -s --test --cool=true
hasFlags('-s'); // true
hasFlags('--test', 'cool=true', '-s'); // true
hasFlags('special'); // false

// ### filterNonUniqueBy

// Filters out the non-unique values in an array, based on a provided comparator function.
// Use `Array.prototype.filter()` and `Array.prototype.every()` for an array containing only the unique values, based on the comparator function, `fn`.
// The comparator function takes four arguments: the values of the two elements being compared and their indexes.

const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));

filterNonUniqueBy(
  [
    { id: 0, value: 'a' },
    { id: 1, value: 'b' },
    { id: 2, value: 'c' },
    { id: 1, value: 'd' },
    { id: 0, value: 'e' }
  ],
  (a, b) => a.id == b.id
); // [ { id: 2, value: 'c' } ]

equals({ a: [2, { e: 3 }], b: [4], c: 'foo' }, { a: [2, { e: 3 }], b: [4], c: 'foo' }); // true

// ### allEqual

// Check if all elements in an array are equal.
// Use `Array.prototype.every()` to check if all the elements of the array are the same as the first one.
const allEqual = arr => arr.every(val => val === arr[0]);

allEqual([1, 2, 3, 4, 5, 6]); // false
allEqual([1, 1, 1, 1]); // true
// ### all
// Returns `true` if the provided predicate function returns `true` for all elements in a collection, `false` otherwise.
// Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.
// Omit the second argument, `fn`, to use `Boolean` as a default.

const all = (arr, fn = Boolean) => arr.every(fn);

all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
