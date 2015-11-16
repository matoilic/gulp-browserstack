var gulp = require('gulp');
var tunnel = require('./index');
var protractor = require('gulp-protractor');

gulp.task('webdriver-update', protractor.webdriver_update);

gulp.task('webdriver-standalone', protractor.webdriver_standalone);

gulp.task('test', ['webdriver-update'], function() {
    gulp
        .src('test.js')
        .pipe(tunnel.startTunnel({
            key: process.env.BROWSERSTACK_KEY
        }))
        .pipe(protractor.protractor({
            configFile: __dirname + '/protractor.config.js'
        }))
        .pipe(tunnel.stopTunnel());
});