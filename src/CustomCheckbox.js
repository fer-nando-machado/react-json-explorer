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
    this.shadowRoot.innerHTML = `
        <style>
          button {
            width: 14px;
            height: 14px;
            margin: 3px;
            padding: 0;
            border: 1px solid black;
            border-radius: 3px;
            outline: none;
            background-color: white;
          }

          button.checked {
            background-color: black;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij4KPHJlY3Qgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiIGZpbGw9ImJsYWNrIj48L3JlY3Q+Cjxwb2x5bGluZQpwb2ludHM9IjIxNiA3Mi4wMDUgMTA0IDE4NCA0OCAxMjguMDA1IgpmaWxsPSJub25lIgpzdHJva2U9IndoaXRlIgpzdHJva2UtbGluZWNhcD0icm91bmQiCnN0cm9rZS1saW5lam9pbj0icm91bmQiCnN0cm9rZS13aWR0aD0iMTYiPgo8L3BvbHlsaW5lPgo8L3N2Zz4=');
          }

          button.focused {
            box-shadow: 0 0 0 2px white, 0 0 0 4px blue;
          }
        </style>
        <input type="checkbox" hidden/><button></button>
      `;
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
