export default function throttle(func, wait) {
    let lastCallTime = 0;   
    return function (...args) {
        const now = Date.now();
        if (now - lastCallTime >= wait) {
            lastCallTime = now; // Update the last call time to the current time
            func.apply(this, args); // Call the original function with the provided arguments
        }
    };      
}   
const throttleFunc = throttle(() => {
    console.log('Throttled function called!');
}, 1000);

// Example usage:
throttleFunc();
throttleFunc();
throttleFunc();
// Only the first call will trigger the console log immediately, and subsequent calls within 1 second will be ignored.      
