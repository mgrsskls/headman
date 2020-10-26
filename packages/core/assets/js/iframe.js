import "./_socket.js";
import Tests from "./_tests.js";

document.addEventListener("DOMContentLoaded", () => {
  const tests = parent.document.querySelector(".Miyagi-tests");

  Tests(tests);
});
