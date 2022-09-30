const pr = console.log;
let { from, of, range, filter, map, Observable, Subscribe } = rxjs;
const assert = chai.assert;
// import { ClickStream } from '../click-stream/click-stream.js';

// range(1, 1)
//   .compose(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x),
//   )
//   .subscribe((x) => pr(x));

const identity = (x) => x;

// window.myId = identity;

const compose =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn.call(null, acc), arg);

describe('compose', () => {
  it('array.reduce', () => {
    let a = [1, 2, 3],
      got = a.reduce((acc, x) => {
        acc.push(x);
        return acc;
      }, []);
    assert.deepEqual(a, got);
  });

  it('basic use', () => {
    let got = compose(identity)(1);
    assert.equal(1, got);

    got = compose(
      identity,
      (x) => x * 3,
      (x) => x * 2,
      identity,
    )(1);
    assert.equal(1 * 2 * 3, got);

    got = compose(
      (xs) => xs.map((x) => x * 2),
      (xs) => xs.filter((x) => x > 5),
    )([1, 2, 3, 4]);
    assert.deepEqual([6, 8], got);
  });
});

// ====================
// Implementation of Observable of rxjs
class MyEvent {
  constructor(e, date = new Date()) {
    this.e = e;
    this.date = date;
  }
}

class MyObservable {
  constructor(cb) {
    this.cb = cb;
  }

  subscribe(cb) {
    const cb0 = this.cb;
    this.cb = (e) => {
      cb0(e).map(cb);
      return [e];
    };
    return this;
  }

  map(cb) {
    const cb0 = this.cb;
    this.cb = (e) => cb0(e).map(cb);
    return this;
  }

  filter(cb) {
    const cb0 = this.cb;
    this.cb = (e) => cb0(e).filter(cb);
    return this;
  }

  take(n) {
    const cb0 = this.cb;
    this.cb = (e) => {
      n--;
      if (n > 0) return cb0(e);
      else return [];
    };
    return this;
  }

  debounce(period) {
    // const cb0 = this.cb;
    // this.cb = (e) => cb0(e).filter((e) => cb(e.e));
    // return this;
  }

  static fromEvent(element, eventName) {
    const o = new MyObservable((e) => [e]);
    element.addEventListener(eventName, (e) => o.cb(e));
    return o;
  }
}

// run it
const div = document.querySelector('#_1'),
  obs = MyObservable.fromEvent(div, 'click');

obs
  .subscribe((e) => {
    pr('e1', e);
  })
  .subscribe((e) => {
    pr('e2', e);
  })
  .map((e) => [e.clientX, e.clientY])
  .filter(([x, y]) => x != y)
  .take(3)
  .subscribe((e) => {
    pr('e3', e);
  });

div.click();

// run book sample
MyObservable.fromEvent(document, 'click')
  .filter((c) => c.clientX > window.innerWidth / 2)
  .take(5)
  .subscribe((c) => console.log('in sample, x:', c.clientX, 'y:', c.clientY));

function try_XMLHttpRequest() {
  const req = new XMLHttpRequest();
  req.open('get', 'test.css');
  req.onload = () => {
    pr('status', req.status);
    pr('response', req.response);
  };
  req.send();
  pr('req', req);

  window.req = req;
}
// try_XMLHttpRequest();

from(['Adrià', 'Julian', 'Jen', 'Sergi']).subscribe(
  (x) => console.log(`Next: ${x}`),
  (err) => console.log('Error:', err),
  () => console.log('Completed'),
);

of(...['Adrià', 'Julian', 'Jen', 'Sergi']).subscribe(
  (x) => console.log(`Next: ${x}`),
  (err) => console.log('Error:', err),
  () => console.log('Completed'),
);
