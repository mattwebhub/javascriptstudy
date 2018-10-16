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
