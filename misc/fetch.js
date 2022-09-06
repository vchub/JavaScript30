const pr = console.log;

// let url = 'https://ipv4-c062-lax009-ix.1.oca.nflxvideo.net/speedtest/range/0-26214400?c=us&n=26421&v=109&e=1662347532&t=Z8Ooso0dW0HLf3O1CYaDqCRxpDgLIWFmu3yPJQ';

// let url =
//   ' https://speedtest.oacys.com.prod.hosts.ooklaserver.net:8080/download?nocache=8a09403e-b991-4716-a234-eb10ccfea7ae&size=100000&guid=a78f57b0-2d31-11ed-be0d-85d48b1baa5e';

let rand_str = '&rnd=' + String(Math.random()).slice(2);
url =
  'https://images.unsplash.com/photo-1514065549995-7706f6017a27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=349&q=80 ';

const MaxIter = 1;
let i = 0,
  intervalId = null;

function download(url) {
  if (i >= MaxIter) {
    clearInterval(intervalId);
    return;
  }

  i++;
  const t0 = new Date();

  fetch(url, { mode: 'no-cors' })
    .then((response) => response.blob())
    // .then((blob) => streamBlob0(blob, { t0: t0, i: i }));
    .then((blob) => downloadImage(blob, { t0: t0, i: i }));
}

const img = document.querySelector('img');
function downloadImage(url, options) {
  fetch(url, options)
    .then((response) => response.blob())
    .then((blob) => window.URL.createObjectURL(blob))
    .then((url) => (img.src = url))
    .catch(console.error);
}

// let tortoise = './tortoise.png';
let tortoise =
  'https://mdn.github.io/dom-examples/streams/grayscale-png/tortoise.png';
downloadImage(url + rand_str);

function streamBlob0(blob, params) {
  let reader = blob.stream().getReader(),
    size = 0;
  reader.read().then(function processData({ done, value }) {
    if (done) {
      pr(params.i, 'stream completed');
      const t1 = new Date();
      pr({ t0: params.t0, dt: t1 - params.t0, size: size });
      return;
    }
    pr('not done yet');
    size += value.length;
    return reader.read().then(processData);
  });
}

// intervalId = setInterval(() => download(url), 1000);
