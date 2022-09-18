import { Lst } from './lst.js';

const pr = console.log;

pr('hi');
pr(Lst.map((x) => x.name + x.val));
