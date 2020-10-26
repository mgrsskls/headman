/**
 * Rendering module
 *
 * @module render
 */

const renderIframe404 = require("./views/iframe/404");
const renderIframeVariation = require("./views/iframe/variation");
const renderIframeStyleguide = require("./views/iframe/styleguide");
const renderMain404 = require("./views/main/404");
const renderMainComponent = require("./views/main/component");
const renderMainVariation = require("./views/main/variation");
const renderMainIndex = require("./views/main/index");

module.exports = {
  renderMainIndex,
  renderMainComponent,
  renderMainVariation,
  renderMain404,
  renderIframeVariation,
  renderIframeStyleguide,
  renderIframe404,
};
