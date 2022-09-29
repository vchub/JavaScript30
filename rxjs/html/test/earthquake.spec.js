// let { from, of, range, filter, map, Observable, Subscribe } = rxjs;
const assert = chai.assert;

describe('misc', () => {
  it('randInt', () => {
    let a = [...Array(5)].map((x) => randInt(5)),
      exp = a.every((x) => x >= 0 && x < 5);
    // pr('a', a);
    assert.ok(exp);
  });
  it('randIntIJ', () => {
    let a = [...Array(5)].map((x) => randIntIJ(2, 5)),
      exp = a.every((x) => x >= 2 && x < 5);
    // pr('a', a);
    assert.ok(exp);

    a = [...Array(5)].map((x) => randIntIJ(-5, -10));
    exp = a.every((x) => x >= -10 && x < -5);
    assert.ok(exp);

    a = [...Array(5)].map((x) => randIntIJ(-5, 10));
    exp = a.every((x) => x >= -5 && x < 10);
    pr('a', a);
    assert.ok(exp);
  });
});
