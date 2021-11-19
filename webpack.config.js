const { VueLoaderPlugin } = require('vue-loader')
const Path = require("path");

module.exports = () => {
    return {
        mode: process.env.env ? process.env.env : 'development',
        entry: {
            app: Path.join(__dirname, '/js/app.js'),
        },
        output: {
            filename: '[name].js',
            path: Path.join(__dirname, '/build/js'),
            publicPath: './build/js/',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
        ]
    };
}