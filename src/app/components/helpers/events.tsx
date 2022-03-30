import _ from 'lodash';

export const onChange = (callback: Function) => (event) => {
  const input = _.trim(event.target.value);
  const value = _.isEmpty(input) ? '' : input;
  callback(value);
};

export const preventDefault = (callback: Function, ...args: any) => (e) => {
  e.preventDefault();
  callback(...args);
};
