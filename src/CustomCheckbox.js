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

  render() {
    this.shadowRoot.innerHTML = `<input type="checkbox" hidden/><button></button>
<link rel="stylesheet" href="./CustomCheckbox.css">`;

    this.nativeCheckbox = this.shadowRoot.querySelector("input");
    this.customCheckbox = this.shadowRoot.querySelector("button");
  }

  bindMethods() {
    this.toggleNativeCheckbox = this.toggleNativeCheckbox.bind(this);
    this.updateCustomCheckbox = this.updateCustomCheckbox.bind(this);
  }

  toggleNativeCheckbox() {
    this.nativeCheckbox.checked = !this.nativeCheckbox.checked;
    this.updateCustomCheckbox();
  }

  updateCustomCheckbox() {
    const nativeChecked = this.nativeCheckbox.checked;
    this.customCheckbox.classList.toggle("checked", nativeChecked);
  }

  setupEventListeners() {
    this.customCheckbox.addEventListener("click", this.toggleNativeCheckbox);
    this.customCheckbox.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      } else if (event.key === " ") {
        event.preventDefault();
        this.toggleNativeCheckbox();
      }
    });
    this.customCheckbox.addEventListener("focus", () => {
      this.customCheckbox.classList.add("focused");
    });
    this.customCheckbox.addEventListener("blur", () => {
      this.customCheckbox.classList.remove("focused");
    });

    this.nativeCheckbox.addEventListener("change", this.updateCustomCheckbox);
    this.nativeCheckbox.addEventListener("focus", () => {
      this.customCheckbox.classList.add("focused");
    });
    this.nativeCheckbox.addEventListener("blur", () => {
      this.customCheckbox.classList.remove("focused");
    });
  }
}

customElements.define("custom-checkbox", CustomCheckbox);
