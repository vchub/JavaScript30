const assert = chai.assert;
import { toHtml } from './index.js';

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
});
