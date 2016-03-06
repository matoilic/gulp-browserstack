#Gulp BrowserStack

Start a SSH tunnel before you run your e2e tests in Gulp and tear it down properly afterwards. See the [BrowserStackTunnelWrapper](https://github.com/pghalliday/node-BrowserStackTunnel) documentation for an overview of the available options.

##Example

```javascript
// running protractor tests on browserstack

var browserStack = require('gulp-browserstack');

gulp
    .src('/test-e2e/**/*Test.js')
    .pipe(browserStack.startTunnel({
        key: 'YOUR_ACCESS_KEY'
    }))
    .pipe(g.protractor.protractor({
        configFile: 'config/protractor-browserstack-config.js'
    }))
    .pipe(browserStack.stopTunnel());
```

You will find the access key in your BrowserStack account details.

##Running the test

The test runner expects to find the API key and the BrowserStack username in the environment variables `BROWSERSTACK_KEY` and `BROWSERSTACK_USER`.
