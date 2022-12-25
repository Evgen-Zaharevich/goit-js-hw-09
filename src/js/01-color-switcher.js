const getRef = selector => document.querySelector(selector);

let intervalId = null;

getRef(`[data-start]`).addEventListener(
  `click`,
  onChangeColorOnClickStartButton
);
getRef(`[data-stop`).addEventListener(`click`, onStopChangeColor);

function onChangeColorOnClickStartButton() {
  intervalId = setInterval(() => {
    getRef(`body`).style.backgroundColor = getRandomHexColor();
  }, 1000);

  getRef(`[data-start]`).setAttribute(`disabled`, true);
  getRef(`[data-stop]`).removeAttribute(`disabled`);
}

function onStopChangeColor() {
  clearInterval(intervalId);

  getRef(`[data-start]`).removeAttribute(`disabled`);
  getRef(`[data-stop]`).setAttribute(`disabled`, true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
