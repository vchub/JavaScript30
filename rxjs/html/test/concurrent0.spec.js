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
  ReplaySubject,
  Subject,
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

  it('Subject', () => {
    let subj = new Subject(),
      acc = [];
    subj.next(1);
    subj.next(2);
    subj.subscribe((x) => acc.push(x));
    subj.next(3);
    assert.deepEqual([3], acc);
  });

  it('ReplaySubject', () => {
    let subj = new ReplaySubject(),
      acc = [];
    subj.next(1);
    subj.next(2);
    subj.subscribe((x) => acc.push(x));
    subj.next(3);
    assert.deepEqual([1, 2, 3], acc);
  });
});

describe('my promise', () => {
  let prOf1;
  beforeEach(
    () =>
      (prOf1 = new Promise((resolve, reject) => setTimeout(resolve(1), 30))),
  );

  it('promise w/ done() called', (done) => {
    prOf1.then((res) => {
      assert.equal(1, res);
      done();
      return 2;
    });
  });

  it('return promise w/o using done()', () => {
    return prOf1.then((res) => {
      assert.equal(1, res);
      return res * 2;
    });
  });

  it('if chain of then return promise also', () => {
    return prOf1
      .then((res) => {
        assert.equal(1, res);
        return res * 2;
      })
      .then((res) => {
        assert.equal(2, res);
        return res * 2;
      })
      .then((res) => {
        assert.equal(4, res);
      });
  });
});
