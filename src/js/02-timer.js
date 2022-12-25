import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let getRef = selector => document.querySelector(selector);

let userDate = null;
let intervalId = null;

getRef(`[data-start]`).setAttribute(`disabled`, true);
getRef(`[data-stop]`).setAttribute(`disabled`, true);
getRef(`[data-start]`).addEventListener(`click`, onStartCountdown);
getRef(`[data-stop]`).addEventListener(`click`, onStopCountdown);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userDate = selectedDates[0];

    if (userDate < Date.now()) {
      Notify.failure('Please choose a date in the future', {
        position: 'center-top',
      });
      getRef(`[data-start]`).setAttribute(`disabled`, true);
      return;
    }
    getRef(`[data-start]`).removeAttribute(`disabled`);
  },
};

flatpickr(getRef(`#datetime-picker`), options);

function onStartCountdown() {
  intervalId = setInterval(() => {
    updateDate();
  }, 1000);

  getRef(`[data-start]`).setAttribute(`disabled`, true);
  getRef(`#datetime-picker`).setAttribute(`disabled`, true);
  getRef(`[data-stop]`).removeAttribute(`disabled`);

  Notify.success('Countdown has started', {
    position: 'center-top',
  });
}

function updateDate() {
  const deltaTime = userDate - Date.now();

  if (deltaTime < 0) {
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  getRef(`[data-days]`).textContent = `${days}`;
  getRef(`[data-hours]`).textContent = `${hours}`;
  getRef(`[data-minutes]`).textContent = `${minutes}`;
  getRef(`[data-seconds]`).textContent = `${seconds}`;
}

function onStopCountdown() {
  clearInterval(intervalId);

  getRef(`[data-start]`).removeAttribute(`disabled`);
  getRef(`#datetime-picker`).removeAttribute(`disabled`);
  getRef(`[data-stop]`).setAttribute(`disabled`, true);

  Notify.warning('Countdown stopped', {
    position: 'center-top',
  });
}

function pad(value) {
  return String(value).padStart(2, `0`);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
