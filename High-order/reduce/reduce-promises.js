/**
 * Reduce and Promises
 */

/**
 * Runs an array of promises in series.
 * Use `Array.prototype.reduce()` to create a promise chain, where each promise returns the next promise when resolved.
 * @param {*} ps
 */
const runPromisesInSeries = ps =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = d => new Promise(r => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]); // Executes each promise sequentially, taking a total of 3 seconds to complete

/**
 * Performs left-to-right function composition for asynchronous functions.
 * Use `Array.prototype.reduce()` with the spread operator (`...`) to perform left-to-right function composition using `Promise.then()`.
 * The functions can return a combination of: simple values, `Promise`'s, or they can be defined as `async` ones returning through `await`.
 * All functions must be unary.
 * @param  {...any} fns
 */
const pipeAsyncFunctions = (...fns) => arg =>
  fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const sum = pipeAsyncFunctions(
  x => x + 1,
  x => new Promise(resolve => setTimeout(() => resolve(x + 2), 1000)),
  x => x + 3,
  async x => (await x) + 4
);
(async () => {
  console.log(await sum(5)); // 15 (after one second)
})();
