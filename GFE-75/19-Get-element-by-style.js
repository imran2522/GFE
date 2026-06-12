/**
 * @param {Element} element
 * @param {string} property
 * @param {string} value
 * @return {Array<Element>}
 */
function getElementsByStyle(element, property, value) {
  const view = element?.ownerDocument?.defaultView;
  if (!view || typeof view.getComputedStyle !== 'function') {
    return [];
  }

  const result = [];
  const elements = element.getElementsByTagName('*');
  for (let i = 0; i < elements.length; i++) {
    const computedStyle = view.getComputedStyle(elements[i]);
    const styleValue =
      computedStyle.getPropertyValue(property) || computedStyle[property];
    if (styleValue === value) {
      result.push(elements[i]);
    }
  }
  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = getElementsByStyle;
}

if (typeof document !== 'undefined') {
  const element = document.createElement('div');
  element.style.display = 'block';
  document.body.appendChild(element);

  console.log(getElementsByStyle(document.body, 'display', 'block')); // [div]
}
