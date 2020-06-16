import "./_socket.js";
import Tests from "./_tests.js";

if (
  location.href.indexOf("/component?") >= 0 &&
  location.href.indexOf("&embedded=true") >= 0 &&
  window.self === window.top
) {
  window.location = location.href.replace("&embedded=true", "");
}

document.addEventListener("DOMContentLoaded", function () {
  const links = Array.from(document.querySelectorAll(`.RoundupComponent-file`));
  const tests = parent.document.querySelector(".Roundup-tests");

  if (tests) {
    Tests(tests);
  }

  if (links.length > 0) {
    import("./_iframe-links.js").then((module) => {
      module.default(links);
    });
  }

  if (document.querySelector(".Roundup-code")) {
    import("./_prism.js");
  }
});
