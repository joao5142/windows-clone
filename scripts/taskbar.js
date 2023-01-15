const dateHourEl = document.getElementById("date-hour");
const dateDayEl = document.getElementById("date-day");
const completDateEl = document.getElementById("date");

const days = [
  "domingo",
  "segunda",
  "terça",
  "quarta",
  "quinta",
  "sexta",
  "sábado",
];

function getDate() {
  let date = new Date();
  let day = date.getUTCDate();
  let month = date.getUTCMonth() + 1;
  let year = date.getUTCFullYear();

  let dayOfWeek = date.getDay();

  setDayName(dayOfWeek);
  setFormatedStringToCompleteDateEl(day, month, year);
  initTimeInterval();
}
function setHours() {
  let date = new Date();

  let hours = date.getHours();
  let minutes = date.getMinutes();

  let formatedHours = hours < 10 ? `0${hours}` : hours;
  let formatedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  let formatedString = formatedHours + ":" + formatedMinutes;

  dateHourEl.innerText = formatedString;
}

function initTimeInterval() {
  setHours();
  setInterval(() => {
    setHours();
  }, 1000);
}

function setDayName(dayOfWeek) {
  dateDayEl.innerText = days[dayOfWeek];
}
function setFormatedStringToCompleteDateEl(day, month, year) {
  let dayString = day.toString();
  let monthString = month.toString();

  if (numberLength(month) <= 1) {
    monthString = "0" + monthString;
  }
  if (numberLength(day) <= 1) {
    dayString = "0" + dayString;
  }
  completDateEl.innerText = dayString + "/" + monthString + "/" + year;
}
function numberLength(number) {
  return number.toString().length;
}

export default { getDate };
