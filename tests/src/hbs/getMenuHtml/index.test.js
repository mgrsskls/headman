describe("hbs/getMenuHtml", () => {
  const index = require("../../../../src/hbs/getMenuHtml/index.js");
  const menu = require("../../../../src/hbs/getMenuHtml/elements/index.js");
  menu.render = jest.fn();

  const app = "app";
  const structure = "structure";
  const request = "request";
  const id = "id";
  const i = "index";

  describe("without passed index", () => {
    test("calls menu.render with the correct params and index=0", () => {
      index.render(app, structure, request, id);

      expect(menu.render).toHaveBeenCalledWith(app, structure, request, id, 0);
    });
  });

  describe("with passed index", () => {
    test("calls menu.render with the correct params", () => {
      index.render(app, structure, request, id, i);

      expect(menu.render).toHaveBeenCalledWith(app, structure, request, id, i);
    });
  });
});
