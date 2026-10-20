/**
 * @param {Array<unknown>} iterable
 * @param {(value: unknown) => Promise<unknown>} callbackFn
 * @param {number} [size=Infinity]
 *
 * @return {Promise<Array<unknown>>}
 */
export default function mapAsyncLimit(iterable, callbackFn, size) {
    // eslint-disable-next-line no-param-reassign
    size = size || Infinity;

    const result = []; // Array to store the results    
    const iterator = iterable[Symbol.iterator](); // Create an iterator from the iterable
    let activeCount = 0; // Counter for active promises 
    let index = 0; // Index to track the position in the result array

    return new Promise((resolve, reject) => {
        // Recursive function to process the next item in the iterator              
        function next() {
            // If the number of active promises is greater than or equal to the limit, return early 
            if (activeCount >= size) {
                return;
            }
            // Get the next value from the iterator     
            const { value, done } = iterator.next();
            // If the iterator is done, check if there are any active promises left. If not, resolve the promise with the result array.
            if (done) {
                // If there are no active promises, resolve the promise with the result array
                if (activeCount === 0) {
                    // Resolve the promise with the result array
                    resolve(result);
                }
                // If there are active promises, return early and wait for them to finish
                return;
            }
            // Increment the active count and store the current index for the result array          
            activeCount++;
            // Store the current index for the result array and increment the index for the next iteration
            const currentIndex = index++;
            // Call the callback function with the current value and handle the promise resolution and rejection                    
            Promise.resolve(callbackFn(value))
                .then((res) => {
                    // Store the resolved value in the result array at the current index    
                    result[currentIndex] = res;
                    // Decrement the active count and call the next function to process the next item in the iterator
                    activeCount--;
                    // Call the next function to process the next item in the iterator
                    next();
                })
                .catch(reject);

            next();
        }

        next();
    });
}

// Usage example:
const iterable = [1, 2, 3, 4, 5];
const callbackFn = async (value) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    return value * 2;
};
const size = 2;

mapAsyncLimit(iterable, callbackFn, size)
    .then((result) => console.log(result)) // Output: [2, 4, 6, 8, 10]
    .catch((error) => console.error(error)); 