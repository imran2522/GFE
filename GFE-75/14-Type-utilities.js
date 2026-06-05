/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isArray(value) {
  return Array.isArray(value);
}

const arr = [1, 2, 3];
console.log(isArray(arr)); // true
console.log(isArray({})); // false
console.log(isArray('string')); // false

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

const func = () => {};
console.log(isFunction(func)); // true
console.log(isFunction({})); // false
console.log(isFunction('string')); // false 

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

const obj2 = { a: 1 };
console.log(isObject(obj2)); // true
console.log(isObject(null)); // false
console.log(isObject([])); // true (arrays are objects in JavaScript)

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isPlainObject(value) {
  return isObject(value) && Object.getPrototypeOf(value) === Object.prototype;
}

const plainObj = { a: 1 };
console.log(isPlainObject(plainObj)); // true
console.log(isPlainObject([])); // false
console.log(isPlainObject(null)); // false
console.log(isPlainObject(new Date())); // false

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string';
}

const str = 'Hello, world!';
console.log(isString(str)); // true
console.log(isString(123)); // false
console.log(isString({})); // false

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && !isNaN(value);
}

const num = 42;
console.log(isNumber(num)); // true
console.log(isNumber('string')); // false
console.log(isNumber(NaN)); // false

/**
 * @param {unknown} value
 * @returns {boolean}
 */
export function isBoolean(value) {
  return typeof value === 'boolean';
}
const bool = true;
console.log(isBoolean(bool)); // true
console.log(isBoolean('string')); // false
console.log(isBoolean(123)); // false     