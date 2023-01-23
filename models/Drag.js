const body = document.body;
const main = document.querySelector("main");
export default class Drag {
  static isClicked = false;
  static currentXPosition = 0;
  static currentYPosition = 0;

  static addDragEventToElement(element) {
    let self = this;

    element.addEventListener("mousedown", function (e) {
      e.preventDefault();
      self.isClicked = true;
      self.currentXPosition = e.offsetLeft;
      self.currentYPosition = e.offsetTop;

      element.parentElement.style.opacity = 0.8;

      console.log("mouseclicked");
      console.dir(e);
      console.dir(element);
    });
    element.addEventListener("dragstart", function (e) {
      console.log("drag", e);
    });
    document.addEventListener("mouseup", function (e) {
      self.isClicked = false;
      console.log("mouse leave");

      element.parentElement.style.opacity = 1;
    });

    document.addEventListener("mousemove", function (e) {
      // console.log(self.isClicked);

      self.handleSelectionMove(e, element.parentElement);

      // console.log("move");
    });
  }
  static removeDragEventToElement(element) {}

  static handleSelectionMove(event, element) {
    let elementCordinates = element.getBoundingClientRect();
    console.log(elementCordinates);
    let positionX = event.pageX;
    let positionY = event.pageY;

    console.log(positionX, positionY);
    if (this.isClicked) {
      element.style.transform = "unset";
      element.style.left = `${positionX}px`;
      element.style.top = `${positionY}px`;
    }

    // console.log(positionX + "px", positionY + "px");
  }
}
