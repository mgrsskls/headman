const path = require("path");
const tests = require("../../tests.json");
const config = require("../../../config.json");
const helpers = require("../../helpers.js");

/**
 * @param {object} object - parameter object
 * @param {object} object.app - the express instance
 * @param {object} object.res - the express response object
 * @param {string} object.file - the component path
 * @param {string} [object.variation] - the variation name
 * @param {string} [object.buildDate] - the build date in machine readable format
 * @param {string} [object.formattedBuildDate] - the build date in human readable format
 * @param {Function} [object.cb] - callback function
 */
module.exports = async function renderMainVariation({
  app,
  res,
  file,
  variation,
  buildDate,
  formattedBuildDate,
  cb,
}) {
  const hideTests =
    !app.get("config").ui.validations.accessibility &&
    !app.get("config").ui.validations.html;

  let standaloneUrl;

  if (app.get("config").isBuild) {
    standaloneUrl = `component-${helpers.normalizeString(
      file
    )}-variation-${helpers.normalizeString(variation)}.html`;
  } else {
    standaloneUrl = `/component?file=${file}&variation=${encodeURIComponent(
      variation
    )}`;
  }

  await res.render(
    "variation.hbs",
    {
      app,
      res,
      file,
      cb,
      folders: app.get("state").menu,
      requestedComponent: file,
      requestedVariation: variation,
      hideTests,
      tests,
      projectName: config.projectName,
      userProjectName: app.get("config").projectName,
      miyagiDev: !!process.env.MIYAGI_DEVELOPMENT,
      miyagiProd: !process.env.MIYAGI_DEVELOPMENT,
      basePath: app.get("config").isBuild
        ? app.get("config").build.basePath
        : "/",
      buildDate,
      formattedBuildDate,
      theme: app.get("config").ui.theme,
      standaloneUrl,
    },
    (err, html) => {
      if (res.send) {
        if (html) {
          res.send(html);
        } else {
          res.send(err);
        }
      }

      if (cb) {
        cb(html);
      }
    }
  );
};
