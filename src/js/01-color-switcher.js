const startButtonRef = document.querySelector(`[data-start]`);
const stopButtonRef = document.querySelector(`[data-stop]`);
const bodyRef = document.body;

let intervalId = null;

startButtonRef.addEventListener(`click`, onChangeColorOnClickStartButton);
stopButtonRef.addEventListener(`click`, onStopChangeColor);

function onChangeColorOnClickStartButton() {
  intervalId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);

  addAttributeDisabled(startButtonRef);
  removeAttributeDisabled(stopButtonRef);
}

function onStopChangeColor() {
  clearInterval(intervalId);

  removeAttributeDisabled(startButtonRef);
  addAttributeDisabled(stopButtonRef);
}

function addAttributeDisabled(element) {
  element.setAttribute(`disabled`, true);
}

function removeAttributeDisabled(element) {
  element.removeAttribute(`disabled`);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
