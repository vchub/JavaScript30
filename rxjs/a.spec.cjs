// import { range } from 'rxjs';
// let rxjs;

// if (typeof window === 'undefined') {
//   rxjs = await import('rxjs');

// } else {
//   rxjs = await import('rxjs');
// }

const pr = console.log;
let { range, filter, map } = require('rxjs');

describe('start specking', () => {
  it('says hi', () => {
    pr('hi');
  });
});

range(1, 13)
  .pipe(
    filter((x) => x % 2 === 1),
    map((x) => x + x),
  )
  .subscribe((x) => pr(x));
