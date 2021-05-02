export default function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    setTimeout(() => {
      fn.call(this, ...args);
    }, delay);
  };
}
