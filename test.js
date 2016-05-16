'use strong';

const requireFromString = require('require-from-string');
const {rollup} = require('rollup');
const test = require('tape');

function runTest(description, main) {
  test(description, t => {
    t.strictEqual(main.name, 'isNaturalNumber');

    t.ok(main(1));
    t.ok(main(1e+1));
    t.ok(main(Number.MAX_SAFE_INTEGER));

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
    t.notOk(main(Number.MAX_SAFE_INTEGER + 1));
    t.notOk(main(Number.MAX_VALUE));
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

    t.ok(main(0, {includeZero: true}));
    t.notOk(main(0, {includeZero: false}));

    t.throws(
      () => main(0, true),
      /^TypeError.*true is not an object\. Expected an object that has boolean `includeZero` property\./
    );

    t.throws(
      () => main(0, {includeZero: '1'}),
      /^TypeError.*1 is neither true nor false\. `includeZero` option must be a Boolean value\./
    );

    t.doesNotThrow(() => main(0, {}));

    t.end();
  });
}

global.window = {};
require('./' + require('./bower.json').main);

runTest('require(\'is-natural-number\')', require('.'));
runTest('window.isNaturalNumber', global.window.isNaturalNumber);

rollup({entry: require('./package.json')['jsnext:main']}).then(bundle => {
  runTest('Module exports', requireFromString(bundle.generate({format: 'cjs'}).code, 'index.jsnext.js'));
});
