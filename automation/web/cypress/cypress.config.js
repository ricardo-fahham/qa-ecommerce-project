const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    apiUrl: "https://serverest.dev",
    frontUrl: "https://front.serverest.dev",
  },

  e2e: {
    baseUrl: "https://front.serverest.dev",
    setupNodeEvents(on, config) {},
  },
});