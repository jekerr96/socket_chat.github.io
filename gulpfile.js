const { src, dest, series } = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const path =  require('path');
const gaze = require('gaze');
const webpack = require("webpack");
const config = require("./webpack.config.js");

function lessBuild() {
   src('./css/style.less')
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(dest('./build/css'));
}

function js() {
    const config = require('./webpack.config.js');
    webpack(config(), (err, status) => {
        console.log(err || status.toString({ colors: true }));
    });
}

function watch() {
    gaze(['css/**/*.less'], {cwd: './'}, function () {
        this.on('all', (ev, filePath) => {
            console.log(filePath + ' was ' + ev);
            series(lessBuild)();
        });
    });

    gaze(['js/**/*.js', 'js/**/*.vue'], {cwd: './'}, function () {
        this.on('all', (ev, filePath) => {
            console.log(filePath + ' was ' + ev);
            series(js)();
        });
    });
}

function buildAll() {
    lessBuild();
    js();
}

module.exports = {
    lessBuild,
    js,
    buildAll,
    watch,
}

module.exports.default = series(watch);