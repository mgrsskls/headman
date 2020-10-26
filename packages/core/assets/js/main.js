import Main from "./_main.js";

class MainDev extends Main {
  constructor() {
    super();

    const tabs = Array.from(document.querySelectorAll(".MiyagiTabs"));
    const styleguide = document.querySelector(".MiyagiStyleguide");

    if (tabs.length > 0) {
      import("./_tabs.js").then((Tabs) => {
        tabs.forEach((tab) => new Tabs.default(tab));
      });
    }

    if (document.querySelector(".Miyagi-code")) {
      import("./_prism.js");
    }

    if (styleguide) {
      import("./styleguide/index.js").then(
        (Styleguide) => new Styleguide.default(styleguide)
      );
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new MainDev());
