'use strict';
module.exports = function() {
    var app = './app/';
    var temp = app + '.tmp/';
    var config = {
        temp: temp,
        app: app,
        /**
         * Files paths
         */
        alljs: [
            app + '**/*.js',
            './*.js',
            '!' + app + 'bower_components/**/*.js'
        ],
        index: app + 'index.html',
        less: app + 'common/styles/custom.less',
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            '!' + app + '**/*.spec.js',
            '!' + app + 'bower_components/**/*.js'
        ],
        css: temp + 'custom.css',


        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: app + 'bower_components/',
            ignorePath: '../..'
        },

        port: 3005
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
