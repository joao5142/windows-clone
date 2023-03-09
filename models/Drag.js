export default class Drag {
  constructor() {
    this.isClicked = false;
    this.currentXPosition = 0;
    this.currentYPosition = 0;
  }

  addDragEventToElement(element) {
    element.addEventListener("mousedown", (e) => {
      e.preventDefault();
      if (e.target.nodeName != "IMG") {
        this.isClicked = true;
        this.currentXPosition = e.offsetLeft;
        this.currentYPosition = e.offsetTop;

        element.parentElement.style.opacity = 0.8;
      }
    });

    document.addEventListener("mouseup", (e) => {
      this.isClicked = false;

      element.parentElement.style.opacity = 1;
    });

    document.addEventListener("mousemove", (e) => {
      this.handleSelectionMove(e, element.parentElement);
    });
  }
  removeDragEventToElement(element) {}

  handleSelectionMove(event, element) {
    let elementCordinates = element.getBoundingClientRect();
    let positionX = event.pageX;
    let positionY = event.pageY;

    if (this.isClicked) {
      console.log(element);
      element.style.transform = "unset";
      element.style.left = `${positionX}px`;
      element.style.top = `${positionY}px`;
    }
  }
}
