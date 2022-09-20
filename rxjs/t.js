import { assert } from 'chai';
import { range } from 'rxjs';
const pr = console.log;

describe('normal module', () => {
  it('deepEqual []', () => {
    assert.deepEqual([1, 2], [1, 2]);
  });
});
