/*!
 * is-natural-number.js | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/is-natural-number.js
*/
'use strict';

module.exports = function isNaturalNumber(val, zero) {
  return val >= (zero ? 0 : 1) && Number.isSafeInteger(val);
};
