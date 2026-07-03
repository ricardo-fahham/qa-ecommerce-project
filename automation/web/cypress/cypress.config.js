const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "https://serverest.dev",
    frontUrl: "https://front.serverest.dev",
    allure: true
  },

  e2e: {
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {

      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;

    },
  },
});