const pr = console.log;
let {
  take,
  scan,
  reduce,
  from,
  of,
  range,
  filter,
  map,
  Observable,
  Subscribe,
} = rxjs;
const assert = chai.assert;

describe('reading the book', () => {
  it('count evens with reduce', () => {
    let got;
    range(21)
      .pipe(reduce((acc, x) => (x % 2 === 0 ? acc + 1 : acc)))
      .subscribe((x) => (got = x));
    assert.equal(got, 10);
  });

  it('count evens with scan, from "infinite" stream', () => {
    let got,
      source = range(20000).pipe(
        scan((acc, x) => (x % 2 === 0 ? acc + 1 : acc)),
        take(21),
      );
    source.subscribe((x) => (got = x));
    assert.equal(got, 10);
    // again
    source.subscribe((x) => (got = x));
    assert.equal(got, 10);
  });
});
