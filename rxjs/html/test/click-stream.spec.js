const pr = console.log;
let { range, filter, map } = rxjs;
const assert = chai.assert;
import { ClickStream } from '../click-stream/click-stream.js';

// range(1, 1)
//   .compose(
//     filter((x) => x % 2 === 1),
//     map((x) => x + x),
//   )
//   .subscribe((x) => pr(x));

const identity = (x) => x;

window.myId = identity;

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

// class Stream {
// 	constructor(){
// 	}
// 	subscribe(cb){
// 		this.cb = cb
// 	}
// }
