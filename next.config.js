/* eslint-disable @typescript-eslint/no-var-requires */
// next.config.js
const withYaml = require("next-plugin-yaml");

module.exports = withYaml({
  pageExtensions: ["js", "ts", "tsx", "md", "mdx"],

  webpack: (config, { dev, isServer }) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
