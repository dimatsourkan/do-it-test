let helpers = require('./helpers');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.common.js');

let webpack = require('webpack');
let CopyWebpackPlugin  = require('copy-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
    plugins : [
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin({sourceMap: true, mangle: { keep_fnames: true }}),

        new CopyWebpackPlugin([{
            from: helpers.root('src', 'public')
        }])
    ]
})