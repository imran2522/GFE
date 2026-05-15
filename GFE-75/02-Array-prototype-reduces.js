if (!Array.prototype.myReduce) {
	Array.prototype.myReduce = function (callbackFn, initialValue) {
        // Check if callbackFn is a function
		if (typeof callbackFn !== 'function') {
			throw new TypeError(callbackFn + ' is not a function');
		}
        // Convert the array-like object to an actual array and get its length  
		const array = Object(this);
		const length = array.length >>> 0;
        // Initialize index and accumulator variables
		let index = 0;
		let accumulator;
        // If initialValue is provided, use it as the initial accumulator value
		if (arguments.length > 1) {
            // If initialValue is provided, use it as the initial accumulator value
			accumulator = initialValue;
		} else {
            // If initialValue is not provided, find the first defined element in the array to use as the initial accumulator value
			while (index < length && !(index in array)) {
                // Skip holes in the array
				index += 1;
			}

			if (index >= length) {
                // If no defined elements are found, throw a TypeError
				throw new TypeError('Reduce of empty array with no initial value');
			}
            // Use the first defined element as the initial accumulator value
			accumulator = array[index];
            // Move to the next index for the reduction process
			index += 1;
		}

		while (index < length) {
			if (index in array) {
                // Apply the callback function to the accumulator and the current element
				accumulator = callbackFn(accumulator, array[index], index, array);
			}
			index += 1;
		}
        // Return the final accumulated value after processing all elements
		return accumulator;
	};
}

// Example usage:
const numbers = [1, 2, 3, 4];
const sum = numbers.myReduce((acc, curr) => acc + curr, 0); // The initial value is 0, so the reduction will sum up all the numbers in the array
console.log(sum); // Output: 10 
