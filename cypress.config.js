const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({

  env:{
    USERNAME: 'EmployeeTestAuto',
    USER_PASSWORD: '123',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cucumber());
      return config;
    },
    supportFile: false,
    specPattern: 'cypress/e2e/**/*.feature'
  },
});
