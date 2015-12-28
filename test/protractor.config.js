exports.config = {
    baseUrl: 'https://google.com',
    rootElement: 'body',
    framework: 'jasmine2',
    maxSessions: 1,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 360000
    },
    seleniumAddress: 'http://hub.browserstack.com/wd/hub',
    multiCapabilities: [{
        'browserstack.user': process.env.BROWSERSTACK_USER,
        'browserstack.key': process.env.BROWSERSTACK_KEY,
        'browserstack.local' : 'true',
        'browserstack.debug': 'false',

        'name': 'Gulp Browserstack',
        'build': 'local',

        'browserName': 'Chrome',
        'browser': 'Chrome',
        'browser_version': '46.0',
        'version': '46.0',
        'os': 'OS X',
        'os_version': 'Yosemite',
        'resolution': '1280x1024'
    }],
    onPrepare: function() {
        var driver = browser.driver;

        browser.manage().timeouts().pageLoadTimeout(400000);
        browser.manage().timeouts().implicitlyWait(15000);
        browser.ignoreSynchronization = true;
    }
};
