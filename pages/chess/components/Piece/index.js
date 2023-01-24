class Piece extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    let props = this.getAttributeNames().reduce((accumulator, attributeName) => {
      return {
        ...accumulator,
        [attributeName]: this.getAttribute(attributeName),
      };
    }, {});

    let element = this.createElement(props);
  }

  createElement(props) {
    let pieceImage = document.createElement("img");
    this.className = "chess__piece";

    pieceImage.src = this.getPieceImage(props.name, props.color);

    this.appendChild(pieceImage);
  }
  getPieceImage(name, color) {
    let folderName = color == "white" ? "white" : "black";

    let stringSource = `assets/images/pieces/${folderName}/${name}.svg`;
    return stringSource;
  }
}

customElements.define("piece-component", Piece);
