import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Notify.success('Sol lucet omnibus');
// Notify.failure('Qui timide rogat docet negare');

const getRef = selector => document.querySelector(selector);
getRef(`form`).addEventListener(`submit`, onClickSubmit);

function onClickSubmit(e) {
  e.preventDefault();
  const {
    elements: { delay, step, amount },
  } = e.target;

  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let i = 0; i < amountValue; i += 1) {
    const counter = i + 1;

    createPromise(counter, delayValue)
      .then(message => Notify.success(message))
      .catch(error => Notify.failure(error));
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
