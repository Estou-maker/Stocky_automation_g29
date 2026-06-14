const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({

  env:{
    USERNAME: 'EmployeeTestAuto',
    USER_PASSWORD: '123',
  },

  reporter: 'cypress-mochawesome-reporter',
    video: true,
      reporterOptions: {
        charts: true,
        ReportPageTitle: 'Stocky Results',
        embeddedScreenshots: true,
        inlineAssets: true,
        saveAllAttempts: true,
        html: true,
        overwrite: true,
        timestamp: 'mmddyyyy_HHMMss',
        reportDir: 'cypress/Reports/Mochawsome-report',
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
