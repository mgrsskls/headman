const config = require("../../../config.json");
const helpers = require("../../../helpers.js");
const validateSchema = require("../../../validator/schema.js");
const {
  extendTemplateData,
  resolveData,
  getComponentErrorHtml,
  getDataForRenderFunction,
  getTemplateFilePathFromDirectoryPath,
} = require("../../helpers.js");

/**
 * @param {object} object - parameter object
 * @param {object} object.app - the express instance
 * @param {object} object.res - the express response object
 * @param {string} object.file - the component path
 * @param {string} [object.variation] - the variation name
 * @param {Function} [object.cb] - callback function
 * @returns {Promise} gets resolved when the variation has been rendered
 */
module.exports = async function renderIframeVariation({
  app,
  res,
  file,
  variation,
  cb,
}) {
  file = getTemplateFilePathFromDirectoryPath(app, file);
  const fullFilePath = helpers.getFullPathFromShortPath(app, file);

  const componentJson = helpers.cloneDeep(
    app.get("state").fileContents[
      helpers.getDataPathFromTemplatePath(app, fullFilePath)
    ] || {}
  );
  const componentVariations = componentJson.$variants;
  let componentRootData = helpers.removeInternalKeys(componentJson);
  let componentData;

  if (componentVariations && variation) {
    let variationJson = componentVariations.find(
      (vari) => vari.$name === decodeURI(variation)
    );

    if (variationJson) {
      componentData = helpers.removeInternalKeys(variationJson);
    }
  }

  componentData = await resolveData(app, componentData, componentRootData);

  componentData = await extendTemplateData(
    app.get("config"),
    componentData,
    file
  );

  validateSchema(app, file, [
    {
      data: componentData,
      name: variation,
    },
  ]);

  return new Promise((resolve) => {
    app.render(
      file,
      getDataForRenderFunction(app, componentData),
      async (error, result) => {
        await res.render(
          "iframe_variation.hbs",
          {
            html:
              typeof result === "string"
                ? result
                : getComponentErrorHtml(error),
            dev: process.env.NODE_ENV === "development",
            prod: process.env.NODE_ENV === "production",
            projectName: config.projectName,
            userProjectName: app.get("config").projectName,
            isBuild: app.get("config").isBuild,
            htmlValidation: app.get("config").ui.validations.html,
            accessibilityValidation: app.get("config").ui.validations
              .accessibility,
            customCSS: app.get("config").ui.customCSS,
          },
          (err, html) => {
            if (res.send) {
              if (html) {
                res.send(html);
              }
            }

            if (cb) {
              cb(html);
            }
          }
        );

        resolve();
      }
    );
  });
};
