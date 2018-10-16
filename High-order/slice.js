// Chunks an array into smaller arrays of a specified size.
// Use `Array.from()` to create a new array, that fits the number of chunks that will be produced.
// Use `Array.prototype.slice()` to map each element of the new array to a chunk the length of `size`.
// If the original array can't be split evenly, the final chunk will contain the remaining elements.
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]

// ### drop

// Returns a new array with `n` elements removed from the left.
// Use `Array.prototype.slice()` to slice the remove the specified number of elements from the left.
const drop = (arr, n = 1) => arr.slice(n);

drop([1, 2, 3]); // [2,3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []

// ### dropRight

// Returns a new array with `n` elements removed from the right.
// Use `Array.prototype.slice()` to slice the remove the specified number of elements from the right.
const dropRight = (arr, n = 1) => arr.slice(0, -n);

dropRight([1, 2, 3]); // [1,2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []

// ### dropRightWhile

// Removes elements from the end of an array until the passed function returns `true`. Returns the remaining elements in the array.
// Loop through the array, using `Array.prototype.slice()` to drop the last element of the array until the returned value from the function is `true`.
// Returns the remaining elements.
const dropRightWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[arr.length - 1])) arr = arr.slice(0, -1);
  return arr;
};

dropRightWhile([1, 2, 3, 4], n => n < 3); // [1, 2]

// ### dropWhile

// Removes elements in an array until the passed function returns `true`. Returns the remaining elements in the array.
// Loop through the array, using `Array.prototype.slice()` to drop the first element of the array until the returned value from the function is `true`.
// Returns the remaining elements.
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};

dropWhile([1, 2, 3, 4], n => n >= 3); // [3,4]

// ### extendHex

// Extends a 3-digit color code to a 6-digit color code.
// Use `Array.prototype.map()`, `String.prototype.split()` and `Array.prototype.join()` to join the mapped array for
// converting a 3-digit RGB notated hexadecimal color-code to the 6-digit form.
// `Array.prototype.slice()` is used to remove `#` from string start since it's added once.
const extendHex = shortHex =>
  "#" +
  shortHex
    .slice(shortHex.startsWith("#") ? 1 : 0)
    .split("")
    .map(x => x + x)
    .join("");

extendHex("#03f"); // '#0033ff'
extendHex("05a"); // '#0055aa'

// ### getColonTimeFromDate

// Returns a string of the form `HH:MM:SS` from a `Date` object.
// Use `Date.prototype.toString()` and `String.prototype.slice()` to get the `HH:MM:SS` part of a given `Date` object.
const getColonTimeFromDate = date => date.toTimeString().slice(0, 8);

getColonTimeFromDate(new Date()); // "08:38:00"

// ### mask

// Replaces all but the last `num` of characters with the specified mask character.
// Use `String.prototype.slice()` to grab the portion of the characters that will remain unmasked and use `String.padStart()`
//to fill the beginning of the string with the mask character up to the original length.
// Omit the second argument, `num`, to keep a default of `4` characters unmasked. If `num` is negative, the unmasked characters will be at the start of the string.
// Omit the third argument, `mask`, to use a default character of `'*'` for the mask.
const mask = (cc, num = 4, mask = "*") =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);

mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, "$"); // '$$$$567890'

// ### maxN

// Returns the `n` maximum elements from the provided array.
// If `n` is greater than or equal to the provided array's length, then return the original array (sorted in descending order).
// Use `Array.prototype.sort()` combined with the spread operator (`...`) to create a shallow clone of the array
// and sort it in descending order.
// Use `Array.prototype.slice()` to get the specified number of elements.
// Omit the second argument, `n`, to get a one-element array.
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3,2]

// ### minN

// Returns the `n` minimum elements from the provided array.
// If `n` is greater than or equal to the provided array's length, then return the original array (sorted in ascending order).
// Use `Array.prototype.sort()` combined with the spread operator (`...`) to create a shallow clone of the array and sort it in ascending order.
// Use `Array.prototype.slice()` to get the specified number of elements.
// Omit the second argument, `n`, to get a one-element array.
const minN = (arr, n = 1) => [...arr].sort((a, b) => a - b).slice(0, n);
minN([1, 2, 3]); // [1]
minN([1, 2, 3], 2); // [1,2]

// ### nthArg

// Creates a function that gets the argument at index `n`. If `n` is negative, the nth argument from the end is returned.
// Use `Array.prototype.slice()` to get the desired argument at index `n`.
const nthArg = n => (...args) => args.slice(n)[0];

const third = nthArg(2);
third(1, 2, 3); // 3
third(1, 2); // undefined
const last = nthArg(-1);
last(1, 2, 3, 4, 5); // 5

// ### nthElement

// Returns the nth element of an array.
// Use `Array.prototype.slice()` to get an array containing the nth element at the first place.
// If the index is out of bounds, return `undefined`.
// Omit the second argument, `n`, to get the first element of the array.
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];

nthElement(["a", "b", "c"], 1); // 'b'
nthElement(["a", "b", "b"], -3); // 'a'

// ### offset

// Moves the specified amount of elements to the end of the array.
// Use `Array.prototype.slice()` twice to get the elements after the specified index and the elements before that.
// Use the spread operator(`...`) to combine the two into one array.
// If `offset` is negative, the elements will be moved from end to start.
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

// ### sampleSize

// Gets `n` random elements at unique keys from `array` up to the size of `array`.
// Shuffle the array using the [Fisher-Yates algorithm](https://github.com/30-seconds/30-seconds-of-code#shuffle).
// Use `Array.prototype.slice()` to get the first `n` elements.
// Omit the second argument, `n` to get only one element at random from the array.
const sampleSize = ([...arr], n = 1) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
};

sampleSize([1, 2, 3], 2); // [3,1]
sampleSize([1, 2, 3], 4); // [2,3,1]

// ### shank

// Has the same functionality as [`Array.prototype.prototype.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice), but returning a new array instead of mutating the original array.
// Use `Array.prototype.slice()` and `Array.prototype.concat()` to get a new array with the new contents after removing existing elements and/or adding new elements.
// Omit the second argument, `index`, to start at `0`.
// Omit the third argument, `delCount`, to remove `0` elements.
// Omit the fourth argument, `elements`, in order to not add any new elements.

const shank = (arr, index = 0, delCount = 0, ...elements) =>
  arr
    .slice(0, index)
    .concat(elements)
    .concat(arr.slice(index + delCount));

const names = ["alpha", "bravo", "charlie"];
const namesAndDelta = shank(names, 1, 0, "delta"); // [ 'alpha', 'delta', 'bravo', 'charlie' ]
const namesNoBravo = shank(names, 1, 1); // [ 'alpha', 'charlie' ]
console.log(names); // ['alpha', 'bravo', 'charlie']


