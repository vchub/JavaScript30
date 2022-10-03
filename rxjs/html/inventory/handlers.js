const pr = console.log;
import { Suggestions } from './components.js';

function drop(e, data) {
  e.preventDefault();
  // pr('in drop', e);
  // pr('in drop clientX', e.clientX);
  const id = e.dataTransfer.getData('text'),
    a = document.getElementById(id);

  // place Element
  const x = e.clientX,
    y = e.clientY;
  a.style.position = 'absolute';
  a.style.left = `${x}px`;
  a.style.top = `${y}px`;
  e.target.append(a);

  // update store
  const tool = data.get(id);
  tool.x = x;
  tool.y = y;
  tool.picId = e.target.id;
  pr('tool', tool);
  // pr('data', data);
}

function dragstart(e) {
  pr(e);
  e.dataTransfer.setData('text', e.target.id);
}

function initData() {
  const m = new Map();
  for (let i = 1; i <= 3; i++) {
    m.set(i.toString(), { num: i });
  }
  return m;
}
const data = initData();

pr(data);

// init DOM
const pic = document.querySelector('#pic');
pic.addEventListener('drop', (e) => drop(e, data));
pic.addEventListener('dragover', (e) => {
  e.preventDefault();
});

const tools = document.querySelector('#tools'),
  toolList = Suggestions({ tools: data.values(), dragstart: dragstart });
tools.append(toolList);

pr(tools);

// pr(pic);
// window.drop = drop;
