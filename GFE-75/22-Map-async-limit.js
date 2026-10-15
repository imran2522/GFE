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

    const result = [];
    const iterator = iterable[Symbol.iterator]();
    let activeCount = 0;
    let index = 0;

    return new Promise((resolve, reject) => {
        function next() {
            if (activeCount >= size) {
                return;
            }

            const { value, done } = iterator.next();

            if (done) {
                if (activeCount === 0) {
                    resolve(result);
                }
                return;
            }

            activeCount++;
            const currentIndex = index++;

            Promise.resolve(callbackFn(value))
                .then((res) => {
                    result[currentIndex] = res;
                    activeCount--;
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