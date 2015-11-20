var through2 = require('through2');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var tunnel;
var tunnelStarted = false;
var gutil = require('gulp-util');

module.exports.startTunnel = function(options) {
    // we don't care for the files, so we just pass them along and start the tunnel
    return through2.obj(function(file, enc, callback) {
        if(!tunnelStarted) {
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

                    process.exit(1);
                }

                callback(null, file);
            });

            tunnelStarted = true;
        } else {
            callback(null, file);
        }
    });

    return stream;
};

module.exports.stopTunnel = function() {
    return through2.obj(function(file, enc, callback) {
        if(tunnelStarted) {
            tunnel.stop(function() {
                callback(null, file);
            });
            tunnelStarted = false;
        }
    });
};
