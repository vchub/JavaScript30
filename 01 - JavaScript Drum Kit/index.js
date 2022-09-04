const ks = [...document.querySelectorAll('.key')];

// add event to k
ks.forEach((k) => {
  k.addEventListener('transitionend', (e) => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
    console.log(e);
  });
});

window.addEventListener('keydown', (e) => playSound(e.keyCode));

function playSound(code) {
  const btn = document.querySelector(`div[data-key='${code}']`);
  const audio = document.querySelector(`audio[data-key='${code}']`);
  if (!audio) return;

  btn.classList.add('playing');
  audio.currentTime = 0;
  audio.play();

  // setTimeout(() => btn.classList.remove('playing'), 500);
  // console.log(code, btn, audio);
}
