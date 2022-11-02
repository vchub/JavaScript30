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
    let res = primesMiddle3(),
      a = new Array(10).fill(null).map((x, i) => i),
      exp = new Set(a);

    assert.deepEqual(exp, res);
  });
});

describe('tictac', () => {
  it('terminal', () => {
    let b = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    assert.equal(true, terminal(b));
    b = ['X', 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'X'];
    assert.equal(true, terminal(b));
    b = [null, 'O', 'X', 'O', 'X', 'X', 'X', 'X', 'X'];
    assert.equal(false, terminal(b));

    b = Array(9).fill(null);
    assert.equal(false, terminal(b));
  });

  it('winner and utlity', () => {
    let b = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];
    assert.equal('X', winner(b));
    assert.equal(1, utility(b));

    b = ['O', 'X', 'X', 'X', 'O', 'X', 'X', 'X', 'O'];
    assert.equal('O', winner(b));
    assert.equal(-1, utility(b));

    b = ['O', 'X', 'X', 'O', 'X', null, 'O', 'X', 'O'];
    assert.equal('O', winner(b));
    assert.equal(-1, utility(b));

    b = ['O', 'X', 'X', 'X', 'X', null, 'O', null, 'O'];
    assert.equal(null, winner(b));
    assert.equal(0, utility(b));
  });
});
