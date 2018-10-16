/**
 * Write regex that will validate a password to make sure it meets the following criteria:
 * At least six characters long
 * Contains a lowercase letter
 * Contains an uppercase letter
 * Contains a number
 * @param {*} password
 */
const validate = password =>
  password.length > 5 &&
  /^[^-]\w+$/g.test(password) &&
  /[a-z]/g.test(password) &&
  /[A-Z]/g.test(password) &&
  /[0-9]/g.test(password);
