const assert = chai.assert;

describe('test Promise', () => {
  it('check deepEqual and equal', () => {
    assert.notEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
    assert.deepEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
    assert.notDeepEqual({ a: 1, b: 2, c: 4 }, { a: 1, b: 2, c: 0 });
  });

  it('with done() o.a == 1 is ok', (done) => {
    onRightA({ a: 1 }).then((o) => done());
  });

  it('w/o done() - return Promise o.a == 1 is ok', () => {
    return onRightA({ a: 1 });
  });
});

describe('Observable', () => {
  it('observe and unobserve', () => {
    const o = new Observable({ a: 1 });
    pr('o', o);
    const state = { a: 2 },
      add1 = (obj) => (state.a = obj.a + 1),
      mult2 = (obj) => (state.b = obj.a * 2);

    o.observe(add1);
    o.observe(mult2);
    assert.deepEqual({ a: 1 }, o.obj);
    assert.deepEqual({ a: 2 }, state);

    o.update((obj) => (obj.a = 3));
    assert.deepEqual({ a: 3 }, o.obj);
    assert.deepEqual({ a: 4, b: 6 }, state);

    o.unobserve(add1);
    o.update((obj) => (obj.a = 4));
    assert.deepEqual({ a: 4 }, o.obj);
    assert.deepEqual({ a: 4, b: 8 }, state);
  });
});

describe('Func closures fun', () => {
  it('creates fn w/ cnt', () => {
    const a = Cnt(0),
      b = Cnt(10);
    assert.equal(a.cnt(), 0);
    assert.equal(b.cnt(), 10);

    assert.equal(a(1), 2);
    assert.equal(a.cnt(), 1);
    assert.equal(b(2), 13);
    assert.equal(b.cnt(), 11);
  });
});

describe('EventRegistry', () => {
  it('listen, fires and unListen', () => {
    const reg = new EventRegistry(),
      st1 = { a: 1, b: 2 },
      st2 = {};

    reg.listen('On', (event) => {
      st1.a++;
      st1.b += event.param;
      st2.a = event.name;
    });
    reg.fireEvent({ name: 'On', param: 2 });

    assert.deepEqual({ a: 2, b: 4 }, st1);
    assert.deepEqual({ a: 'On' }, st2);
  });
});
