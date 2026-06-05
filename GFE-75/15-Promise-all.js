/**
 * @param {Array} iterable
 * @return {Promise<Array>}
 */
export default function promiseAll(iterable) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(iterable)) {
            return reject(new TypeError('Input must be an array'));
        }

        if (iterable.length === 0) {
            resolve([]);
            return;
        }
        
        const results = [];
        let completedCount = 0;
        
        iterable.forEach((item, index) => {
            Promise.resolve(item)
                .then(value => {
                    results[index] = value; // Store the resolved value at the correct index
                    completedCount++;
                    if (completedCount === iterable.length) {
                        resolve(results); // Resolve with the array of results when all promises are resolved
                    }
                })
                .catch(error => {
                    reject(error); // Reject immediately if any promise is rejected
                });
        });
    });     
}

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

promiseAll([promise1, promise2, promise3]).then(values => {
  console.log(values); // [3, 42, "foo"]
}).catch(error => {
  console.error('Error:', error);
}); 