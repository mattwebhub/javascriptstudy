/**
 * Given a list of digits, return the smallest number that could be formed from these digits,
 * using the digits only once (ignore duplicates).
 * @param {*} a
 */
const minValue = a => {
  +[...new Set(a)].sort((a, b) => a - b).join("");
};

// 1- minValue ({1, 3, 1})  ==> return (13)
