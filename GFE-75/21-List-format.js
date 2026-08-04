/**
 * @param {Array<string>} items
 * @param {Object} options
 * @param {boolean} [options.sorted]
 * @param {number} [options.length]
 * @param {boolean} [options.unique]
 * @returns {string}
 */
export default function listFormat(items, options = {}) {
  if (!items || items.length === 0) {
    return '';
  }

  // 1. Filter out falsy/empty strings
  let processedItems = items.filter((item) => item !== '' && item != null);

  if (processedItems.length === 0) {
    return '';
  }

  // 2. Handle 'unique' option
  if (options.unique) {
    processedItems = Array.from(new Set(processedItems));
  }

  // 3. Handle 'sorted' option
  if (options.sorted) {
    processedItems.sort();
  }

  const totalLength = processedItems.length;

  // 4. Handle 'length' option (must be > 0 and < totalLength to slice)
  if (
    typeof options.length === 'number' &&
    options.length > 0 &&
    options.length < totalLength
  ) {
    const visibleItems = processedItems.slice(0, options.length);
    const remainingCount = totalLength - options.length;
    const otherText = remainingCount === 1 ? 'other' : 'others';

    return `${visibleItems.join(', ')} and ${remainingCount} ${otherText}`;
  }

  // 5. Standard formatting (no length truncation)
  if (totalLength === 1) {
    return processedItems[0];
  }

  if (totalLength === 2) {
    return `${processedItems[0]} and ${processedItems[1]}`;
  }

  const lastItem = processedItems[totalLength - 1];
  const initialItems = processedItems.slice(0, totalLength - 1);

  return `${initialItems.join(', ')} and ${lastItem}`;
}

let items = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
let options = { sorted: true, unique: true };
console.log(listFormat(items, options));

