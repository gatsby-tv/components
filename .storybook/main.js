const path = require("path");

module.exports = {
  stories: ["../lib/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@app": path.resolve(__dirname, "../lib/"),
        },
      },
    };
  },
};
