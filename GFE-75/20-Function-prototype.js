/**
 * @param {any} thisArg
 * @param {...*} argArray
 * @return {any}
 */
Function.prototype.myCall = function (thisArg, ...argArray) {
  if (typeof this !== 'function') {
    throw new TypeError('myCall must be called on a function');
  }
  // If thisArg is null or undefined, default to the global object
  thisArg = thisArg || globalThis;
  // Create a unique symbol to avoid property name collisions on thisArg
  const fnSymbol = Symbol();
  // Assign the function to be called as a property of thisArg
  thisArg[fnSymbol] = this;
  // Call the function with the provided arguments and store the result
  const result = thisArg[fnSymbol](...argArray);
  // Remove the temporary property from thisArg
  delete thisArg[fnSymbol];
  return result;
};

const originalCall = Function.prototype.call;
const myCall = Function.prototype.myCall;

console.log(originalCall === myCall); // false
console.log(myCall === Function.prototype.call); // false
console.log(myCall === Function.prototype.myCall); // true

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const result = greet.myCall(null, 'Hello', 'Alice');
console.log(result); // "Hello, Alice!" 