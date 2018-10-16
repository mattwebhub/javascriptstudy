/**
 * return odd numbers below the given one
 * ex: 7 return [5]
 * @param {*} n 
 */
const oddCount = n => Math.floor(n/2) ;
/**
 * Highest and Minimun
 * Returns the highest and minimun values of an array.
 * @param {*} arr 
 */
const minMax = arr => [ Math.min(...arr), Math.max(...arr) ];
/**
 * minMax([1,2,3,4,5])   == [1,5]
   minMax([2334454,5])   == [5, 2334454]
   minMax([1])           == [1, 1]
 */