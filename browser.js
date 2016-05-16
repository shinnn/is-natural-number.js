/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
window.isNaturalNumber = function isNaturalNumber(val, zero) {
  'use strict';
  return val >= (zero ? 0 : 1) && Number.isInteger(val);
};
