var through2 = require('through2');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var tunnel;
var gutil = require('gulp-util');

module.exports.startTunnel = function(options) {
    // we don't care for the files, so we just pass them along and start the tunnel
    return through2.obj(function(file, enc, callback) {
        if(!tunnel || tunnel.state === 'stop') {
            tunnel = new BrowserStackTunnel(options);
            tunnel.start(function(err) {
                if(err) {
                    var messageStart = err.message.indexOf('*** Error');
                    var messageEnd = err.message.indexOf('Configuration Options');
                    var message = err.message.substr(
                        messageStart,
                        messageEnd - messageStart
                    );

                    gutil.log(gutil.colors.red('Failed to start BrowserStack tunnel'));
                    gutil.log(gutil.colors.red(message));
                }
                callback(err, file);
            });
        } else {
            // tunnel already started
            callback(null, file);
        }
    });
};

module.exports.stopTunnel = function() {
    return through2.obj(function(file, enc, callback) {
        if(!!tunnel) {
            tunnel.stop(function(err) {
                callback(err, file);
            });
            tunnel = undefined;
        } else {
            // no tunnel to stop
            callback(null, file);
        }
    });
};
