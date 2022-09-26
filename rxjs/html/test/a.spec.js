const pr = console.log;
let { range, filter, map } = rxjs;
const assert = chai.assert;

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
