// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import * as globalHelpers from './config/global_helpers';
import _ from 'lodash';

global._ = global._ || _;
_.assign(global, globalHelpers);
