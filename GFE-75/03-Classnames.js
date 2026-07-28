export default function classNames(...args) {
    const classes = [];

    for (const arg of args) {
        if (typeof arg === 'string' && arg) {
            classes.push(arg);
        } else if (typeof arg === 'number' && arg !== 0) {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg));
        } else if (typeof arg === 'object' && arg !== null) {
            for (const key in arg) {
                if (arg[key]) {
                    classes.push(key);
                }
            }
        }
    }

    return classes.filter(Boolean).join(' ');
}

// Example usage:
const buttonClass = classNames('btn', ['btn-primary', { 'btn-disabled': false }]);
console.log(buttonClass); // Output: "btn btn-primary"  