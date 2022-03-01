export const onChange = (callback) => (event) => {
  const input = _.trim(event.target.value);
  const value = _.isEmpty(input) ? '' : input;
  callback(value);
};

export const preventDefault = (callback, ...args) => (e) => {
  e.preventDefault();
  callback(...args);
};
