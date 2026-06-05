/**
 * @param {Array<*|Array>} value
 * @return {Array}
 */
export default function flatten(value) {
    const result = [];
    for (const item of value) {
        if (Array.isArray(item)) {
            result.push(...flatten(item)); // Recursively flatten nested arrays
        } else {
            result.push(item); // Add non-array items directly to the result
        }
    }
    return result; // Return the flattened array    
}

// Example usage:
const nestedArray = [1, [2, 3], [4, [5, 6]], 7];
const flatArray = flatten(nestedArray);
console.log(flatArray); // Output: [1, 2, 3, 4, 5, 6, 7]    