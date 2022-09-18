const assert = chai.assert;
import { Place, App, EventRegistry } from './app.js';

const pr = console.log;

describe('function', () => {
  it('desctructure arguments', () => {
    function add({ a, b }) {
      return a + b;
    }
    const props = { a: 1, b: 3 };
    assert.equal(4, add(props));
  });
});

describe('class', () => {
  it('desctructure class obj', () => {
    const place = new Place('a', 'ca');
    const { city, st } = place;
    assert.equal('a', city);
  });
  it('extends', () => {
    class A {
      constructor(x) {
        this.x = x;
      }
      add(y) {
        return this.x + y;
      }
      sub(y) {
        return this.x - y;
      }
    }
    class B extends A {
      constructor(x) {
        super(x);
      }
      add(y) {
        return this.x * y;
      }
    }
    const a = new A(1),
      b = new B(1);

    assert.equal(a.add(1), 2);
    assert.equal(a.sub(1), 0);
    assert.equal(b.sub(1), 0);
    assert.equal(b.add(1), 1);
  });
});

describe('App', () => {
  it('extends EventRegistry', () => {
    class Reg extends EventRegistry {
      constructor(x) {
        super();
        this.x = x;
        this.listen('change a', (e) => {
          // pr('in Reg.constructor, e', e);
        });
      }
      f(x) {
        this.fire({ name: 'change a', data: x });
      }
    }

    const reg = new Reg(1),
      a = { a: 1, b: 2 },
      b = { a: 1, b: 2 };

    reg.listen('change a', (e) => {
      // pr('in describe App, e', e);
      b.a = e.data + b.a;
    });
    assert.deepEqual({ a: 1, b: 2 }, b);
    reg.fire({ name: 'change a', data: 1 });
    assert.deepEqual({ a: 2, b: 2 }, b);

    reg.f(2);
    assert.deepEqual({ a: 4, b: 2 }, b);
  });
});
