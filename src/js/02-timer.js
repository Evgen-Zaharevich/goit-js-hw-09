import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePicker = document.querySelector(`#datetime-picker`);
const startButtonRef = document.querySelector(`[data-start]`);
const stopButtonRef = document.querySelector(`[data-stop]`);
const daysRef = document.querySelector(`[data-days]`);
const hoursRef = document.querySelector(`[data-hours]`);
const minutesRef = document.querySelector(`[data-minutes]`);
const secondsRef = document.querySelector(`[data-seconds]`);

let userDate = null;
let intervalId = null;

addAttributeDisabled(startButtonRef);
addAttributeDisabled(stopButtonRef);
startButtonRef.addEventListener(`click`, onStartCountdown);
stopButtonRef.addEventListener(`click`, onStopCountdown);

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
      addAttributeDisabled(startButtonRef);
      return;
    }
    remoteAttributeDisabled(startButtonRef);
  },
};

flatpickr(dateTimePicker, options);

function onStartCountdown() {
  intervalId = setInterval(() => {
    updateDate();
  }, 1000);

  addAttributeDisabled(startButtonRef);
  addAttributeDisabled(dateTimePicker);
  remoteAttributeDisabled(stopButtonRef);

  Notify.success('Countdown has started', {
    position: 'center-top',
  });
}

function updateDate() {
  const deltaTime = userDate - Date.now();

  if (deltaTime < 0) {
    return;
  }
  setValueOnTimer(deltaTime);
}

function setValueOnTimer(deltaTime) {
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  daysRef.textContent = `${days}`;
  hoursRef.textContent = `${hours}`;
  minutesRef.textContent = `${minutes}`;
  secondsRef.textContent = `${seconds}`;
}

function onStopCountdown() {
  clearInterval(intervalId);

  remoteAttributeDisabled(startButtonRef);
  remoteAttributeDisabled(dateTimePicker);
  addAttributeDisabled(stopButtonRef);

  Notify.warning('Countdown stopped', {
    position: 'center-top',
  });
}

function pad(value) {
  return String(value).padStart(2, `0`);
}

function addAttributeDisabled(element) {
  element.setAttribute(`disabled`, true);
}

function remoteAttributeDisabled(element) {
  element.removeAttribute(`disabled`);
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
