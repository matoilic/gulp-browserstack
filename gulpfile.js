var gulp = require('gulp');
var tunnel = require('./index');
var protractor = require('gulp-protractor');

gulp.task('webdriver-update', protractor.webdriver_update);

gulp.task('webdriver-standalone', protractor.webdriver_standalone);

gulp.task('test', ['webdriver-update'], function() {
    return gulp
        .src(['test/test.js', 'test/test-two.js'])
        .pipe(tunnel.startTunnel({
            key: process.env.BROWSERSTACK_KEY
        }))
        .pipe(protractor.protractor({
            configFile: __dirname + '/test/protractor.config.js'
        }))
        .pipe(tunnel.stopTunnel());
});
