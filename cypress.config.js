const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require ('cypress-mochawesome-reporter/plugin')(on);
      return on ('file:preprocessor', cucumber())
    },
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.feature'
  },
});
