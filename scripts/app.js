import backgrounds from "./backgrounds.js";
import taskbar from "./taskbar.js";

const body = document.body;
const footer = document.querySelector(".footer");
const container = document.querySelector(".container");
const activeIcons = document.querySelectorAll(".icon");
const menuList = document.querySelector(".list");
const selection = document.querySelector(".selection");
const main = document.querySelector("main");

let initialPositionClickX = null;
let initialPositionClickY = null;

let selectionActive = false;
let isClicked = false;

function handleClickContainer(e) {
  if (e.target !== e.currentTarget) return;
  removeActiveIcons();
  removeMenuListActive();
}

function handleClickFooter(e) {
  removeActiveIcons();
}
function removeActiveIcons() {
  activeIcons.forEach((icon) => {
    icon.classList.remove("active");
  });
  removeMenuListActive();
}

// Menu right click functions
function removeMenuListActive() {
  if (menuList.classList.contains("active")) {
    menuList.classList.remove("active");
  }
}
function addActiveClassToMenuList() {
  if (!menuList.classList.contains("active")) {
    menuList.classList.add("active");
  }
}

// Selection Functions
function setInitialClickPositionSelection(e) {
  initialPositionClickX = e.pageX;
  initialPositionClickY = e.pageY;
  selection.style.top = `${e.pageY}px`;
  selection.style.left = `${e.pageX}px`;
  selection.classList.add("active");
  selectionActive = true;
}
function resetSelection() {
  selectionActive = false;
  selection.style.width = "0px";
  selection.style.height = "0px";
  selection.style.transform = `translate(0px,0px)`;
  selection.classList.remove("active");
}

function handleSelectionMove(e) {
  let positionX = e.pageX;
  let positionY = e.pageY;

  let widthX = 0;
  let heightY = 0;

  if (positionX < initialPositionClickX) {
    widthX = initialPositionClickX - positionX;
    selection.style.transform = `translateX(${-widthX}px)`;
  } else {
    widthX = positionX - initialPositionClickX;
  }
  if (positionY < initialPositionClickY) {
    heightY = initialPositionClickY - positionY;
    selection.style.transform = `translateY(${-heightY}px)`;
  } else {
    heightY = positionY - initialPositionClickY;
  }

  if (positionX < initialPositionClickX && positionY < initialPositionClickY) {
    selection.style.transform = `translate(${-widthX}px,${-heightY}px)`;
  }

  selection.style.width = widthX + "px";
  selection.style.height = heightY + "px";
}

//init import's methods
backgrounds.initTimeout();
taskbar.getDate();

container.addEventListener("click", handleClickContainer);
footer.addEventListener("click", handleClickFooter);

body.addEventListener("mousedown", (e) => {
  if (isClicked) resetSelection();

  isClicked = true;

  let selectionSpaceAllowed = e.target == main || e.target == container;

  if (selectionSpaceAllowed) setInitialClickPositionSelection(e);

  if (e.target !== e.currentTarget) return;
  removeMenuListActive();
});

body.addEventListener("mouseup", () => {
  resetSelection();
  isClicked = false;
});

body.addEventListener("mousemove", (e) => {
  if (selectionActive) {
    handleSelectionMove(e);
  }
});

body.addEventListener("contextmenu", (e) => {
  if (isClicked) resetSelection();
  e.preventDefault();

  addActiveClassToMenuList();

  menuList.style.top = `${e.pageY}px`;
  menuList.style.left = `${e.pageX}px`;
});
