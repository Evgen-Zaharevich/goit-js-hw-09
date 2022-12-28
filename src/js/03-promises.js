import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    delayValue += stepValue;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
