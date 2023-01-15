/* eslint-disable */
export function throttle(fn, wait) {
  let throttled = false;
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, wait);
    }
  };
}

export function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}

export function bindRaf(fn, throttle) {
  var isRunning;
  var that;
  var args;

  var run = function() {
    isRunning = false;
    fn.apply(that, args);
  };

  return function() {
    that = this;
    args = arguments;

    if (isRunning && throttle) {
      return;
    }

    isRunning = true;
    requestAnimationFrame(run);
  };
}
