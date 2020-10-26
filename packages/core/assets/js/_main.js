class Main {
  constructor() {
    this.classes = {
      toggleComponent: "Miyagi-toggle",
      toggleMenu: "Miyagi-toggleMobileMenu",
      link: "Miyagi-link",
      directory: "Miyagi-component",
    };

    this.elements = {
      toggleMenu: document.querySelector(`.${this.classes.toggleMenu}`),
      links: Array.from(document.querySelectorAll(`.${this.classes.link}`)),
      directories: Array.from(
        document.querySelectorAll(
          `.${this.classes.directory}:not(${this.classes.link})`
        )
      ),
      componentToggles: Array.from(
        document.querySelectorAll(`.${this.classes.toggleComponent}`)
      ),
    };

    this.addToggleMenuClickListener();
    this.addDirectoriesClickListener();
    this.addComponentTogglesClickListener();
  }

  static toggleExpandedAttribute(toggle) {
    toggle.setAttribute(
      "aria-expanded",
      toggle.getAttribute("aria-expanded") === "true" ? false : true
    );
  }

  // events

  onToggleMenuClick(toggle) {
    Main.toggleExpandedAttribute(toggle);
  }

  onDirectoryClick(directory) {
    const toggle = directory.previousElementSibling;

    if (toggle && toggle.classList.contains(this.classes.toggleComponent)) {
      toggle.setAttribute("aria-expanded", true);
    }
  }

  onComponentToggleClick(toggle) {
    Main.toggleExpandedAttribute(toggle);
  }

  // listeners

  addToggleMenuClickListener() {
    if (this.elements.toggleMenu) {
      this.elements.toggleMenu.addEventListener("click", (e) => {
        e.preventDefault();

        this.onToggleMenuClick(e.target);
      });

      this.elements.toggleMenu.addEventListener("keyup", (e) => {
        if (e.keyCode === 23) {
          e.preventDefault();

          this.onToggleMenuClick(e.target);
        }
      });
    }
  }

  addDirectoriesClickListener() {
    this.elements.directories.forEach((directory) => {
      directory.addEventListener("click", (e) => {
        this.onDirectoryClick(e.target);
      });
    });
  }

  addComponentTogglesClickListener() {
    this.elements.componentToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();

        this.onComponentToggleClick(e.target);
      });

      toggle.addEventListener("keyup", (e) => {
        if (e.keyCode === 32) {
          e.preventDefault();

          this.onComponentToggleClick(e.target);
        }
      });
    });
  }
}

export default Main;
