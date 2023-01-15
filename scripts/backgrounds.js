const body = document.querySelector("body");
const backgroundList = [
  "/assets/backgrounds/background1.webp",
  "/assets/backgrounds/background2.webp",
  "/assets/backgrounds/background3.webp",
];
let interval = null;
let activeBackground = 0;

function changeBackground() {
  if (activeBackground < backgroundList.length - 1) {
    activeBackground++;
  } else {
    activeBackground = 0;
  }

  body.style.backgroundImage = `url(${backgroundList[activeBackground]})`;
}

function initTimeout() {
  interval = setInterval(() => {
    changeBackground();
  }, 25000);
}
export default {
  initTimeout,
};
