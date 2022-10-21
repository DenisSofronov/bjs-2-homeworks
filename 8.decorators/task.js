function hash(args) {
  return args.join("-");
}

function cachingDecoratorNew(func) {
  let cache = new Map();

  return function(...args) {
    if (cache.size > 5) {
      cache.delete(Array.from(cache.keys())[0]);
    }

    let key = hash(args);
    if (!cache.has(key)) {
      let result = func.call(this, ...args);
      cache.set(key, result);
      console.log("Вычисляем: " + result);
      return "Вычисляем: " + result;
    }
    console.log("Из кэша: " + cache.get(key));
    return "Из кэша: " + cache.get(key);
  }
}


function debounceDecoratorNew(func, interval) {
  let timeout;

  function wrapper(arguments) {
    if (!timeout) {
      func.apply(this, arguments);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, interval);
  }

  return wrapper;
}

function debounceDecorator2(func, interval) {
  let timeout;
  wrapper.count = 0;

  function wrapper(arguments) {
    if (!timeout) {
      func.apply(this, arguments);
      wrapper.count++;
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, arguments);
      wrapper.count++;
    }, interval);
  }
  return wrapper;
}
