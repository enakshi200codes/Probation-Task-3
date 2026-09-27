export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
export function qsa(selector, parent = document) {
  return parent.querySelectorAll(selector);
}
export function on(target, event, callback) {
  if (target instanceof NodeList || Array.isArray(target)) {
    target.forEach(el => el.addEventListener(event, callback));
  } else if (target) {
    target.addEventListener(event, callback);
  }
}
export function toggleClass(target, className) {
  const el = typeof target === 'string' ? qs(target) : target;
  if (el) {
    el.classList.toggle(className);
  }
}