class ListMenu extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <nav class="list">
          <ul>
             <div class="list__group"> 
                <li class="list__item--subgroup">View <img src="/assets/icons/chevron-right.png"/>
                     <div class="list list--subgroup list--subgroup--right">
                        <ul>
                            <div class="list__group"> 
                                <li>Large Icons</li>
                                <li>Medium Icons</li>
                                <li>Small</li>
                            </div>
                             <div class="list__group"> 
                                <li>Auto arrange icons</li>
                                <li>Algin icons to grid</li>
                             </div>
                             <div class="list__group"> 
                                <li>Show desktop icons</li>
                                
                             </div>
                        </ul>
                     </div>
                </li>
                <li class="list__item--subgroup">Sort By <img src="/assets/icons/chevron-right.png"/>
                
                    <div class="list list--subgroup list--subgroup--right">
                           <ul>
                                <li>Name</li>
                                <li>Size</li>
                                <li>Item type</li>
                                <li>Data modified</li>
                           </ul>
                    </div>
                </li>
                <li>Refresh</li>
             </div>
             <div class="list__group"> 
                <li class="deactivated">Paste</li>
                <li class="deactivated">Paste Schortcut</li>
                <li>Undo Move</li>
                <li>Open in Terminal</li>
              </div>

              <div class="list__group"> 
                <li>New</li>
              </div>
          </ul>
        </nav>
     
    `;

    this.addEventToListItem();
  }
  addEventToListItem() {
    let arrayLi = this.querySelectorAll(
      "li:not(.list__item--subgroup,.deactivated)"
    );
    let arrayLiSubgroup = this.querySelectorAll("li.list__item--subgroup");
    let listMenu = this.querySelector(".list");

    arrayLi.forEach((li) => {
      li.addEventListener("click", () => {
        listMenu.classList.remove("active");
      });
    });
    arrayLiSubgroup.forEach((li) => {
      li.addEventListener("click", () => {
        li.classList.remove("active");
      });
      li.addEventListener("mouseenter", () => {
        li.classList.add("active");
      });
      li.addEventListener("mouseleave", () => {
        li.classList.remove("active");
      });
    });
  }
}
customElements.define("list-menu-component", ListMenu);
