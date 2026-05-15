# GFE-75 — JavaScript Challenges

Solutions to [GreatFrontEnd](https://www.greatfrontend.com/) JavaScript coding challenges.

---

## Challenges

### 01 — Debounce
**File:** `GFE-75/01-Debounce.js`

Implement `debounce(func, wait)` so that `func` is only called after `wait` milliseconds have elapsed since the last invocation. Each new call resets the timer. The callback always runs with the latest arguments and `this` context from the most recent call.

```js
const debounced = debounce(fn, 300);
debounced(); // timer starts
debounced(); // timer resets
// fn is called once, 300ms after the last call
```

---

### 02 — Array.prototype.myReduce
**File:** `GFE-75/02-Array-prototype-reduces.js`

Implement `Array.prototype.myReduce` to mirror the native `Array.prototype.reduce` without overwriting it.

**Behaviour:**
- Accepts a `callbackFn(accumulator, currentValue, index, array)` and an optional `initialValue`.
- If no `initialValue` is provided, the first present element is used and iteration starts from index 1.
- Throws `TypeError` if `callbackFn` is not a function or if the array is empty and no `initialValue` is given.
- Correctly skips holes in sparse arrays.

```js
[1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 0); // 10
[1, 2, 3, 4].myReduce((acc, curr) => acc + curr);    // 10
```

---

## Running

```bash
cd GFE-75
node 01-Debounce.js
node 02-Array-prototype-reduces.js
```
