import { assert } from 'chai';
import { pr, normalcdf, normsInv, phi } from './lib/norm.mjs';

function* dice(sides) {
  let i = 1;
  for (; ; i++) {
    if (i > sides) i = 1;
    yield i;
  }
}

xdescribe('dice', () => {
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

function* primesGen() {
  yield 2;
  const primes = new Set([2]);
  for (let i = 3; ; i += 2) {
    let isPrime = true;
    for (const x of primes) {
      if (i % x === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.add(i);
      yield i;
    }
  }
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

// experiment();

xdescribe('primes', () => {
  it('primes', () => {
    let res = primes(10);
    assert.deepEqual([2, 3, 5, 7], res);
    assert.deepEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31], primes(32));
  });

  it('primesGen', () => {
    let got = [],
      pGen = primesGen();
    for (let i = 0; i < 12; i++) {
      got.push(pGen.next().value);
    }
    let exp = primes(38);
    // pr(got);
    assert.deepEqual(exp, got);
  });
});

describe('normal dist', () => {
  it('cdf and phi', () => {
    let x = 0,
      cdf = normalcdf(x),
      x_p_phi = phi(normalcdf(x));
    assert.closeTo(0.5, cdf, 0.0001);
    assert.closeTo(x, x_p_phi, 0.0001);
  });
});

function calc() {
  let [a, b] = [2, 8.5],
    f = 1 / (b - a),
    mu = (b + a) / 2,
    vr = (b - a) ** 2 / 12,
    p4 = (4 - a) * f,
    plog = (Math.E - a) * f;
  pr('calc:', f, mu, vr, p4, plog);
}
calc();
