let helpers = require('./helpers');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.common.js');

let HOST = 'localhost:8080';

module.exports = webpackMerge(commonConfig, {
    devtool : 'eval-source-map',
    output : {
        path          : helpers.root('./dist'),
        publicPath    : `http://${HOST}/`,
        filename      : 'js/[name].js',
        chunkFilename : '[id].chunk.js'
    },

    devServer : {
        historyApiFallback : true,
        quiet              : true,
        compress           : true,
        stats              : 'minimal'
    }
});