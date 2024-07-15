class CustomCheckbox extends HTMLElement {
  static observedAttributes = ["checked"];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.bindMethods();
    this.setupEventListeners();
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name === "checked") {
      this.nativeCheckbox.checked = newValue === "true";
      this.updateCustomCheckbox();
    }
  }

  async connectedCallback() {
    const svg = await fetch("./CustomCheckbox.svg");
    this.customCheckbox.innerHTML = await svg.text();
  }

  render() {
    this.shadowRoot.innerHTML = `<link rel="stylesheet" href="./CustomCheckbox.css">
<input type="checkbox" hidden/><button></button>`;

    this.nativeCheckbox = this.shadowRoot.querySelector("input");
    this.customCheckbox = this.shadowRoot.querySelector("button");
  }

  bindMethods() {
    this.updateCustomCheckbox = this.updateCustomCheckbox.bind(this);
    this.focusCustomCheckbox = this.focusCustomCheckbox.bind(this);
    this.clickNativeCheckbox = this.clickNativeCheckbox.bind(this);
  }

  updateCustomCheckbox() {
    const nativeChecked = this.nativeCheckbox.checked;
    this.customCheckbox.classList.toggle("checked", nativeChecked);
  }

  focusCustomCheckbox(focused) {
    this.customCheckbox.classList.toggle("focused", focused);
  }

  clickNativeCheckbox() {
    this.nativeCheckbox.checked = !this.nativeCheckbox.checked;
    this.updateCustomCheckbox();
  }

  setupEventListeners() {
    this.customCheckbox.addEventListener("click", this.clickNativeCheckbox);
    this.customCheckbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      } else if (event.key === " ") {
        event.preventDefault();
        this.clickNativeCheckbox();
      }
    });
    this.customCheckbox.addEventListener("focus", () => {
      this.focusCustomCheckbox(true);
    });
    this.customCheckbox.addEventListener("blur", () => {
      this.focusCustomCheckbox(false);
    });

    this.nativeCheckbox.addEventListener("change", this.updateCustomCheckbox);
    this.nativeCheckbox.addEventListener("focus", () => {
      this.focusCustomCheckbox(true);
    });
    this.nativeCheckbox.addEventListener("blur", () => {
      this.focusCustomCheckbox(false);
    });
  }
}

customElements.define("custom-checkbox", CustomCheckbox);
