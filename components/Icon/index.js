class Icon extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let props = this.getAttributeNames().reduce(
      (accumulator, attributeName) => {
        return {
          ...accumulator,
          [attributeName]: this.getAttribute(attributeName),
        };
      },
      {}
    );

    let element = this.createElement(props);

    this.appendChild(element);
  }

  createElement(props) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let image = document.createElement("img");

    div.setAttribute("draggable", "true");
    div.classList.add("icon");

    p.innerText = props.text;
    p.classList.add("icon__text");

    image.classList.add("icon__img");

    image.src = props.image;

    div.appendChild(image);
    div.appendChild(p);

    this.style.position = "absolute";
    this.style.top = `${props.y}%`;
    this.style.left = `${props.x}%`;

    this.handleClick(div);
    return div;
  }
  handleClick(element) {
    element.addEventListener("click", () => {
      let elements = document.querySelectorAll(".icon");
      elements.forEach((icon) => {
        icon.classList.remove("active");
      });
      element.classList.toggle("active");
    });
  }
}
customElements.define("icon-component", Icon);
