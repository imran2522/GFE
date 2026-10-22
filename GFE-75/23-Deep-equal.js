/**
 * @param {unknown} valueA
 * @param {unknown} valueB
 * @returns {boolean}
 */
export default function deepEqual(valueA, valueB) {
  // 1. Check strict equality first (handles primitives, same references, +0 vs -0 edge case)
  if (valueA === valueB) {
    // Object.is handles +0 and -0 correctly (-0 === +0 is true, but Object.is(-0, +0) is false)
    return valueA !== 0 || Object.is(valueA, valueB);
  }

  // 2. Check for NaN (NaN !== NaN in JavaScript)
  if (Number.isNaN(valueA) && Number.isNaN(valueB)) {
    return true;
  }

  // 3. Ensure both values are non-null objects/arrays, otherwise they are not equal
  if (
    typeof valueA !== 'object' ||
    valueA === null ||
    typeof valueB !== 'object' ||
    valueB === null
  ) {
    return false;
  }

  // 4. Check if both are arrays
  const isArrayA = Array.isArray(valueA);
  const isArrayB = Array.isArray(valueB);

  // If one is an array and the other is an object, they are not equal
  if (isArrayA !== isArrayB) {
    return false;
  }

  if (isArrayA && isArrayB) {
    if (valueA.length !== valueB.length) {
      return false;
    }

    // Compare each index, preserving sparse array structure (checking 'in' operator)
    for (let i = 0; i < valueA.length; i++) {
      const hasA = i in valueA;
      const hasB = i in valueB;

      if (hasA !== hasB) {
        return false;
      }

      if (hasA && !deepEqual(valueA[i], valueB[i])) {
        return false;
      }
    }

    return true;
  }

  // 5. Compare plain objects
  const keysA = Object.keys(valueA);
  const keysB = Object.keys(valueB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(valueB, key)) {
      return false;
    }

    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  return true;
}

//Test cases
console.log(deepEqual(1, 1)); // true
console.log(deepEqual(1, '1')); // false
console.log(deepEqual(NaN, NaN)); // true
console.log(deepEqual([1, 2], [1, 2])); // true
console.log(deepEqual([1, 2], [2, 1])); // false
console.log(deepEqual({ a: 1 }, { a: 1 })); // true
console.log(deepEqual({ a: 1 }, { b: 1 })); // false
console.log(deepEqual({ a: { b: 2 } }, { a: { b: 2 } })); // true
console.log(deepEqual({ a: { b: 2 } }, { a: { b: 3 } })); // false  