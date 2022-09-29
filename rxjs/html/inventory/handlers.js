const pr = console.log;

const dropH = (e) => {
  e.preventDefault();
  pr(e);
};
const dragoverH = (e) => {
  e.preventDefault();
};

window.dropH = dropH;
window.dragoverH = dragoverH;
