const data = {
  digitclock: document.querySelector('#digitclock'),
  shand: document.querySelector('.second-hand'),
  mhand: document.querySelector('.min-hand'),
  hhand: document.querySelector('.hour-hand'),
};

function showtime({ digitclock, shand, mhand, hhand }) {
  const t = new Date(),
    sdeg = t.getSeconds() * (360 / 60) + 90,
    mdeg =
      t.getMinutes() * (360 / 60) + 90 + ((t.getSeconds() / 60) * 360) / 60,
    hdeg = t.getHours() * (360 / 12) + 90 + t.getMinutes() * 0.5;

  digitclock.textContent = t.toLocaleTimeString();
  shand.style.transform = `rotate(${sdeg}deg)`;
  mhand.style.transform = `rotate(${mdeg}deg)`;
  hhand.style.transform = `rotate(${hdeg}deg)`;
}

const iPnt = setInterval(() => showtime(data), 1000);

// showtime(data);
