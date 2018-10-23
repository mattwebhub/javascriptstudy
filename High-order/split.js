/**
 * Increment string
 * Write a function which increments a string, to create a new string.
 * If the string already ends with a number, the number should be incremented by 1.
 * If the string does not end with a number the number 1 should be appended to the new string.
 * @param {*} string
 */
const incrementString = string => {
  const arr = string.split(/(\d+)/);
  const newNumber = (Number(arr[1]) || 0) + 1;
  return arr[0] + newNumber.toString().padStart((arr[1] || []).length, "0");
};
/**
    foo -> foo1
    foobar23 -> foobar24
    foo0042 -> foo0043
    foo9 -> foo10
    foo099 -> foo100
   */
