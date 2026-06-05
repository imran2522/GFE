/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
    if (value === null || typeof value !== 'object') {
        return value;
    }

    if (Array.isArray(value)) {
        return value.map(deepClone);
    }

    const clonedObj = {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(value[key]);
        }
    }
    return clonedObj;       
}

const original = {
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'hiking'],
    address: {
        city: 'New York',
        zip: '10001'
    }
};

const cloned = deepClone(original);
cloned.name = 'Bob';
cloned.hobbies.push('cooking');
cloned.address.city = 'Los Angeles';

console.log(original);
/*
{
    name: 'Alice',
    age: 30,
    hobbies: ['reading', 'hiking'],
    address: {
        city: 'New York',
        zip: '10001'
    }
}
*/

console.log(cloned);
/*
{
    name: 'Bob',
    age: 30,
    hobbies: ['reading', 'hiking', 'cooking'],
    address: {
        city: 'Los Angeles',
        zip: '10001'
    }
}
*/      