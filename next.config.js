// next.config.js
const withUnified = require("next-transpile-modules")([
  "unified",
  "bail",
  "trough",
  "rehype-stringify",
  "hast-util-to-html",
  "html-void-elements",
  "hast-util-whitespace",
  "stringify-entities",
  "character-entities-html4",
  "ccount",
]);
const withYaml = require("next-plugin-yaml");

module.exports = withUnified(withYaml({}));
