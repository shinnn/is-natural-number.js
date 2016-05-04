'use strong';

const requireUncached = require('require-uncached');
const test = require('tape');

function runTest(description, main) {
  test(description, t => {
    t.strictEqual(main.name, 'isNaturalNumber');

    t.ok(main(1));
    t.ok(main(1e+1));
    t.ok(main(Number.MAX_SAFE_INTEGER));
    t.ok(main(Number.MAX_SAFE_INTEGER + 1));
    t.ok(main(Number.MAX_VALUE));

    t.notOk(main(0));
    t.notOk(main(1.5));
    t.notOk(main(1e-1));
    t.notOk(main(1.0000000000005));
    t.notOk(main('1'));
    t.notOk(main(['10']));
    t.notOk(main(['2']));
    t.notOk(main(['0', '1']));
    t.notOk(main({number: 1}));
    t.notOk(main(/123/));
    t.notOk(main(Number.MIN_VALUE));
    t.notOk(main(Number.POSITIVE_INFINITY));
    t.notOk(main(Number.NEGATIVE_INFINITY));
    t.notOk(main(NaN));
    t.notOk(main(Number));
    t.notOk(main('1'));
    t.notOk(main(false));
    t.notOk(main(true));
    t.notOk(main(this));
    t.notOk(main(null));
    t.notOk(main(undefined));

    t.ok(main(0, true));
    t.notOk(main(0, false));

    t.end();
  });
}

global.window = {};
const bowerMainPath = './' + require('./bower.json').main;
const nativeIsInteger = Number.isInteger;

Number.isInteger = null;

requireUncached(bowerMainPath);

runTest('Test for require(\'is-natural-number\') on ES5 environment', requireUncached('.'));
runTest('window.isNaturalNumber on ES5 environment', global.window.isNaturalNumber);

Number.isInteger = nativeIsInteger;
require(bowerMainPath);

runTest('Test for require(\'is-natural-number\') on ES6+ environment', require('.'));
runTest('window.isNaturalNumber on ES6+ environment', global.window.isNaturalNumber);
