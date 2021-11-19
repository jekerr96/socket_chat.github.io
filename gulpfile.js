const { src, dest, series } = require('gulp');
const less = require('gulp-less');
const path =  require('path');
const gaze = require('gaze');

function lessBuild() {
   src('./css/style.less')
        .pipe(less())
        .pipe(dest('./build/css'));
}

function watch() {
    gaze(['css/**/*.less'], {cwd: './'}, function () {
        this.on('all', (ev, filePath) => {
            console.log(filePath + ' was ' + ev);
            series(lessBuild)();
        });
    });
}

module.exports = {
    lessBuild,
    watch,
}

module.exports.default = series(watch);