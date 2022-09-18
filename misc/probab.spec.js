const assert = chai.assert;
const pr = console.log;

function* dice(sides) {
  let i = 1;
  for (; ; i++) {
    if (i > sides) i = 1;
    yield i;
  }
}

describe('dice', () => {
  it('cycle', () => {
    const d = dice(2),
      acc = [];
    for (let i = 0; i < 4; i++) {
      acc.push(d.next().value);
    }
    assert.deepEqual([1, 2, 1, 2], acc);
  });
});

function primes(n) {
  const res = [2];
  for (let i = 3; i <= n; i += 2) {
    if (res.every((x) => i % x != 0)) res.push(i);
  }
  return res;
}

function* twoDice(sides) {
  for (let i = 1; i <= sides; i++) {
    for (let j = 1; j <= sides; j++) {
      yield [i, j];
    }
  }
}

function experiment() {
  const prs = primes(36),
    succ = [];
  for (const [a, b] of twoDice(6)) {
    if (prs.includes(a + b)) {
      succ.push([a, b]);
      pr([a, b]);
    }
  }
  let exp = succ.length / 36;
  pr(`succ.length: ${succ.length}`);
  pr(`exp $1 is ${succ.length / 36}`);
  pr(`exp $3 is ${(1 / 6) * 3}`);
}

experiment();

describe('experiment', () => {
  it('primes', () => {
    let res = primes(10);
    assert.deepEqual([2, 3, 5, 7], res);
    assert.deepEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31], primes(32));
  });
});
