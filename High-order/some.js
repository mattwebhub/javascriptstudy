/**
 * Some function
 * It returns `true` if either of the value passed in the array returns `true`
 * It is passed the operator || instead of &&
 */

const some = (arr, fn) => {
  let result = false;
  for (const value of arr) result = result || fn(value);
  return result;
};
/**
 * Examples
 */

/**
 * 1) Returns `true` if the provided predicate function returns `true` for AT LEAST one element in a collection, `false` otherwise.
 * 
 * Use `Array.prototype.some()` to test if any elements in the collection return `true` based on `fn`.
 * Omit the second argument, `fn`, to use `Boolean` as a default.
 */

const any = (arr, fn = Boolean) => arr.some(fn);

any([0, 1, 2, 0], x => x >= 2); // true
any([0, 0, 1, 0]); // true