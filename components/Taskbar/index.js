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
              <ul>
                <li><img src="/assets/icons/arrow-top.png"/> </li>
                <li><img src="/assets/icons/battery.png"/> </li>
                <li><img src="/assets/icons/wifi.png"/> </li>
                <li><img src="/assets/icons/volume.png"/></li>
                <li class="footer__input-method">
                  <span>ENG</span>
                  <span>PTB2</span>
                </li>
                <li class="footer__date"> 
                   <span id="date-hour">16:36</span>
                   <span id="date-day">domingo</span> 
                   <span id="date">15/01/2023</span>
                </li>
                <li><img src="/assets/icons/notification.png"/></li>
            
               
              </ul>
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
