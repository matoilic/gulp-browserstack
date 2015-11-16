var through2 = require('through2');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var tunnel;
var tunnelStarted = false;
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

module.exports.startTunnel = function(options) {
    tunnel = new BrowserStackTunnel(options);

    // we don't care for the files, so we just pass them along and start the tunnel
    return through2.obj(
        function(file, enc, callback) {
            this.push(file);
            
            if(!tunnelStarted) {
                tunnel.start(function(err) {
                    if(err) {
                        err = new PluginError({
                            plugin: 'BrowserStack',
                            message: err
                        });
                    }
                
                    callback(err);
                });
                
                tunnelStarted = true;
            } else {
                callback();
            }
        }
    );
};

module.exports.stopTunnel = function() {
    return through2.obj(
        function(file, enc, callback) {
            this.push(file);
            
            if(tunnelStarted) {
                tunnel.killTunnel();
                tunnel = null;
                tunnelStarted = false;
            }
                
            callback();
        }
    );
};
