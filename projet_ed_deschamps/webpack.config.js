const path = require("path");

const Webpack = require('webpack');

module.exports = {
    entry : {
		index : './client/src/page-index.js',
		meteo : './client/src/page-meteo.js',
    },
    mode : 'development',
    output : {
        filename : '[name].js',
        path : path.resolve(__dirname, 'client/dist')
    },
    plugins: [
    ]
}