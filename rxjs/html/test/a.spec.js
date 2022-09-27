const pr = console.log;
let { range, filter, map } = rxjs;
const assert = chai.assert;

xdescribe('start specking', () => {
  it('says hi', () => {
    pr('hi');
  });
});

range(1, 2)
  .pipe(
    filter((x) => x % 2 === 1),
    map((x) => x + x),
  )
  .subscribe((x) => pr(x));

// class Stream {
// 	constructor(){
// 	}
// 	subscribe(cb){
// 		this.cb = cb
// 	}
// }

class ClickStream {
  constructor(element, cb = (e) => [e]) {
    this.element = element;
    this.cb = cb;
    this.cb0 = false;
    element.addEventListener('click', (e) => this.cb(e));
  }

  subscribe(cb) {
    const cb0 = this.cb;
    this.cb = (e) => cb0(e).map(cb);
    return this;
  }

  filter(pred) {
    const cb0 = this.cb;
    this.cb = (e) => cb0(e).filter(pred);
    return this;
  }

  map(fn) {
    const cb0 = this.cb;
    this.cb = (e) => cb0(e).map(fn);
    return this;
  }

  debounce(period) {
    const cb0 = this.cb;
    this.cb = (e) => {
      if (this.cb0) return;
      const res = cb0(e);
      this.cb0 = this.cb;
      this.cb = () => {};
      setTimeout(() => {
        this.cb = this.cb0;
        this.cb0 = null;
      }, period);
      return res;
    };
    return this;
  }
}

const div = document.querySelector('.mycontent');

const cs = new ClickStream(div);
cs.map((e) => [e.clientX, e.clientY])
  .filter(([x, y]) => x != y)
  .subscribe((e) => {
    pr('subscribe 0, e', e);
    return e;
  })
  .debounce(1000)
  .subscribe((e) => {
    pr('subscribe 1, e', e);
    return e;
  });

let clicks = [
  [10, 20],
  [0, 0],
  [3, 5],
  [5, 5],
].forEach(([x, y]) =>
  div.dispatchEvent(new MouseEvent('click', { clientX: x, clientY: y })),
);
