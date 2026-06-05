export default function classNames(...args) {
    const classes = [];
    for (const arg of args) {
        if (typeof arg === 'string') {
            classes.push(arg);
        } else if (typeof arg === 'object' && arg !== null) {
            for (const key in arg) {
                if (arg[key]) {
                    classes.push(key);
                }
            }
        }
    }
    return classes.join(' ');   
}

// Example usage:
const buttonClass = classNames('btn', { 'btn-primary': true, 'btn-disabled': false });
console.log(buttonClass); // Output: "btn btn-primary"  