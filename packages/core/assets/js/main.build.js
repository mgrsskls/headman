import "./_prism.js";
import Main from "./_main.js";
import Tabs from "./_tabs.js";

class MainBuild extends Main {
  constructor() {
    super();

    const tabs = Array.from(document.querySelectorAll(".MiyagiTabs"));
    if (tabs.length > 0) {
      tabs.forEach((tab) => new Tabs(tab));
    }
  }
}

document.addEventListener("DOMContentLoaded", () => new MainBuild());
