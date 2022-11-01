const assert = chai.assert;

describe('equality', () => {
  it('check deepEqual and equal', () => {
    assert.notEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
    assert.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
    assert.notDeepEqual({ a: 1, b: 2, c: 4 }, { a: 1, b: 2, c: 0 });
  });
});

// int -> [int]
function* primes() {
  const res = [2];
  yield 2;
  for (let i = 3; ; i += 2) {
    if (!res.some((x) => i % x == 0)) {
      res.push(i);
      yield i;
    }
  }
}

function primesN(n) {
  let res = [];
  for (const x of primes()) {
    if (x < n) {
      res.push(x);
    } else break;
  }
  return res;
}

function primesMiddle3() {
  let res = new Set();
  for (const x of primes()) {
    if (x > 1000) return res;
    if (x > 100) {
      res.add(parseInt(String(x)[1]));
    }
  }
  return res;
}

describe('primes', () => {
  it('primesN', () => {
    let res = primesN(22);
    assert.deepEqual([2, 3, 5, 7, 11, 13, 17, 19], res);
  });
  it('primesMiddle', () => {
    let res = primesMiddle3();
    pr('res', res);
  });
});
