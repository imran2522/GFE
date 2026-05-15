/**
 * @param {(...args: Array<unknown>) => unknown} func
 * @param {number} wait
 * @returns {(...args: Array<unknown>) => void}
 */
export default function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

const debounceFunc = debounce(() => {
  console.log('Debounced function called!');
}, 1000);

// Example usage:
debounceFunc();
debounceFunc();
debounceFunc();
// Only the last call will trigger the console log after 1 second.    