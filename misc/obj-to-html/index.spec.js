const assert = chai.assert;
import { toHtml, runInTest, count } from './index.js';

const pr = console.log;

describe('toHtml', () => {
  it('number, string', () => {
    let obj = 2;
    let res = toHtml(obj);
    assert.equal('2', res.textContent);

    obj = 'xxx';
    res = toHtml(obj);
    assert.equal('xxx', res.textContent);

    obj = { a: 1, b: 'str' };
    res = toHtml(obj);
    pr('res', res);
  });

  it('count should count', () => {
    assert.deepEqual({ a: 1, b: 2 }, count('bab'));
    assert.deepEqual({ a: 3, b: 2 }, count('abaab'));
  });
});

runInTest();
