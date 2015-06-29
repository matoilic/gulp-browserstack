var through2 = require('through2');
var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var tunnel;

module.exports.startTunnel = function(options) {
    tunnel = new BrowserStackTunnel(options);

    // we don't care for the files, so we just pass them along and start the tunnel at the end of the stream
    return through2.obj(
        function(file, enc, callback) {
            this.push(file);
            callback();
        },
        function (callback) {
            tunnel.start(function() {
                callback();
            });
        }
    );
};

module.exports.stopTunnel = function() {
    return through2.obj(
        function(file, enc, callback) {
            this.push(file);
            callback();
        },
        function (callback) {
            tunnel.killTunnel();
            tunnel = null;

            callback();
        }
    );
};
