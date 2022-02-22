export const onChange = (callback) => (event) => {
  callback(_.trim(event.target.value));
};

export const preventDefault = (callback, ...args) => (e) => {
  e.preventDefault();
  callback(...args);
};
