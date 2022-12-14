// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

require('babel-register');
var protractor = require('protractor');

var config = {
    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 110000,

    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: `http://web2-nodejs:${process.env.PORT || '9002'}`,

    directConnect: false,

    SELENIUM_PROMISE_MANAGER: false,

    restartBrowserBetweenTests: true,

    // list of files / patterns to load in the browser
    specs: [
        'e2e/**/*.spec.js'
    ],

    // Patterns to exclude.
    exclude: [],

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    multiCapabilities: [{
        browserName: 'chrome',
        seleniumAddress: 'http://web2-selenium-chrome:4444/wd/hub',
        chromeOptions: {
            args: [
                '--disable-dev-shm-usage',
                '--disable-extensions',
                '--disable-gpu',
                '--disable-software-rasterizer',
                '--headless',
                '--no-sandbox',
                '--test-type=browser',
                '--window-size=1920,1280'
            ]
        }
    }/*, {
        browserName: 'firefox',
        seleniumAddress: 'http://web2-selenium-firefox:4444/wd/hub'
    }*/],

    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: 'mocha',

    // ----- Options to be passed to mocha -----
    mochaOpts: {
        reporter: 'spec',
        timeout: 30000,
        defaultTimeoutInterval: 30000
    },

    // Prepare environment for tests
    params: {
        serverConfig: require('./server/config/environment')
    },

    onPrepare() {
        require('babel-register');
        // Load Mocha and Chai + plugins
        require('./mocha.conf');

        var serverConfig = config.params.serverConfig;

        // Setup mongo for tests
        var mongoose = require('mongoose');
        return mongoose.connect(serverConfig.mongo.uri, serverConfig.mongo.options); // Connect to database
    }
};

config.params.baseUrl = config.baseUrl;
exports.config = config;
