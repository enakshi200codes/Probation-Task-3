/**
 * Selects a single DOM element.
 * @param {string} selector 
 * @param {Element} [parent=document] 
 * @returns {Element|null}
 */
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Selects multiple DOM elements.
 * @param {string} selector 
 * @param {Element} [parent=document] 
 * @returns {NodeListOf<Element>}
 */
export function qsa(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Adds an event listener to an element or collection of elements.
 * @param {Element|NodeList|Array} target 
 * @param {string} event 
 * @param {Function} callback 
 */
export function on(target, event, callback) {
  if (target instanceof NodeList || Array.isArray(target)) {
    target.forEach(el => el.addEventListener(event, callback));
  } else if (target) {
    target.addEventListener(event, callback);
  }
}

/**
 * Toggles a CSS class on an element.
 * @param {Element|string} target 
 * @param {string} className 
 */
export function toggleClass(target, className) {
  const el = typeof target === 'string' ? qs(target) : target;
  if (el) {
    el.classList.toggle(className);
  }
}