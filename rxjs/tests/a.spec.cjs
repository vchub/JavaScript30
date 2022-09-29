// dynamic import
// if (typeof window === 'undefined') {
//   rxjs = await import('rxjs');

// } else {
//   rxjs = await import('rxjs');
// }

const pr = console.log;
let {
  flatMap,
  of,
  from,
  take,
  reduce,
  range,
  filter,
  map,
  bindNodeCallback,
} = require('rxjs');
let { assert } = require('chai');

describe('misc', () => {
  it('range', () => {
    let acc = [];
    const r = range(1, 10).pipe(
      filter((x) => x % 2 == 0),
      map((x) => x * 2),
    );
    r.subscribe((x) => acc.push(x));
    assert.deepEqual([4, 8, 12, 16, 20], acc);

    // another sink
    let acc2 = [];
    r.subscribe((x) => acc2.push(x));
    assert.deepEqual([4, 8, 12, 16, 20], acc2);

    range(1, 5)
      .pipe(reduce((acc, x) => acc.concat([x]), []))
      .subscribe((x) => assert.deepEqual([1, 2, 3, 4, 5], x));
  });

  it('node.fs.readdir', () => {
    const fs = require('fs'),
      readdir = bindNodeCallback(fs.readdir),
      source = readdir('.'),
      subscription = source.subscribe(
        (res) => pr(`List of .: ${res}`, typeof res, Array.isArray(res)),
        (err) => pr(`err: ${err}`),
        () => pr('Done'),
      );
  });

  it('flatMap', () => {
    from([of(1, 2, 3), from([4, 5, 6])])
      .pipe(
        flatMap((x) => x),
        reduce((acc, x) => [x, ...acc], []),
      )
      .subscribe((x) => {
        assert.deepEqual([1, 2, 3, 4, 5, 6].reverse(), x);
      });
  });
});
