class Taskbar extends HTMLElement {
  constructor() {
    super();
    this.liArray = null;
  }

  connectedCallback() {
    this.innerHTML = `
       
        <footer  class="footer">
          <nav class="footer__principal">
            <ul>
              <li class="no-effect" tabindex="0"> <img src="/assets/icons/logo-windows.svg"/></li>
              <li class="no-effect" tabindex="0"> <img src="/assets/icons/search.svg"/></li>
              <li tabindex="0"> <img src="/assets/icons/folder.svg"/></li>
              <li tabindex="0"> <img src="/assets/icons/edge.svg"/></li>
              <li tabindex="0"> <img src="/assets/icons/chess.svg"/></li>
              <li tabindex="0"> <img src="/assets/icons/settings.svg"/></li>
            </ul>
          </nav>
          <nav class="footer__secondary">

          </nav>
        </footer>
     
    `;
    this.liArray = this.querySelectorAll(
      ".footer__principal li:not(.no-effect)"
    );
    this.handleClickLi();
  }
  removeActiveClassToLiElement() {
    this.liArray.forEach((li) => {
      li.classList.remove("active");
    });
  }
  handleClickLi() {
    this.liArray.forEach((li) => {
      li.addEventListener("click", () => {
        this.removeActiveClassToLiElement();
        li.classList.add("active");
        li.classList.add("opened");
      });
    });
  }
}
customElements.define("taskbar-component", Taskbar);
