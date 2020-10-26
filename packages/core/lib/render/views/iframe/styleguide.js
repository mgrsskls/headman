const config = require("../../../config.json");
const {
  getColors,
  getFonts,
  getSpacings,
  getMediaQueries,
} = require("../../../styleguide/index.js");

module.exports = async function renderStyleguide({ app, res, cb }) {
  const colors = app.get("state").css
    ? getColors(
        app.get("state").css,
        app.get("config").assets.customProperties.prefixes.color
      )
    : [];
  const fonts = app.get("state").css
    ? getFonts(
        app.get("state").css,
        app.get("config").assets.customProperties.prefixes.typo
      )
    : [];
  const spacings = app.get("state").css
    ? getSpacings(
        app.get("state").css,
        app.get("config").assets.customProperties.prefixes.spacing
      )
    : [];
  const mediaQueries = app.get("state").css
    ? getMediaQueries(app.get("state").css)
    : [];

  await res.render(
    "iframe_styleguide.hbs",
    {
      colors:
        colors.map(({ styles }) => styles.length).reduce((a, b) => a + b, 0) > 0
          ? colors
          : [],
      fonts: fonts.length > 0 ? fonts : null,
      spacings: spacings.length > 0 ? spacings : null,
      mediaQueries,
      customProperties: app.get("config").assets.customProperties,
      projectName: config.projectName,
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
