// Helper: root() is defined at the bottom
let path    = require('path');
let webpack = require('webpack');
let helpers = require('./helpers');

// Webpack Plugins
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let autoprefixer       = require('autoprefixer');
let HtmlWebpackPlugin  = require('html-webpack-plugin');
let ExtractTextPlugin  = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.npm_lifecycle_event !== "build"
});

module.exports = {
    devtool : 'source-map',
    entry   : {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts' // our angular app
    },
    output : {
        path          : helpers.root('./dist'),
        publicPath    : '/',
        filename      : 'js/[name].[hash].js',
        chunkFilename : '[id].[hash].chunk.js'
    },
    stats : {
        errorDetails: true
    },
    resolve : {
        extensions: ['.ts', '.js', '.json', '.css', '.less', '.html']
    },
    module : {
        rules: [

            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader', '@angularclass/hmr-loader'],
                exclude: [/node_modules\/(?!(ng2-.+))/]
            },

            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader'
            },

            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },

            {
                test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.css$/,
                exclude: helpers.root('.'),
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'raw-loader']})
            },

            {
                test: /\.css$/,
                include: helpers.root('.'),
                loader: 'style-loader!raw-loader!css-loader'
            },

            {
                test: /\.less$/,
                exclude: helpers.root('.'),
                loader: ExtractTextPlugin.extract({ fallback : 'style', use : ['css', 'less'] })
            },

            {
                test: /\.less$/,
                include: helpers.root('.'),
                loader: 'raw-loader!less-loader'
            },

            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: helpers.root('admin', 'public')
            }
        ]
    },
    plugins : [

        extractLess,

        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(process.env.npm_lifecycle_event)
            }
        }),

        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src') // location of your src
        ),

        new webpack.LoaderOptionsPlugin({
            options: {
                tslint: {
                    emitErrors: false,
                    failOnHint: false
                },
                postcss: [
                    autoprefixer({
                        browsers: [
                            'Firefox > 20',
                            'iOS > 6',
                            'not ie <= 8'
                        ]
                    })
                ]
            }
        }),

        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            inject : true,
            template : './src/public/index.html',
            chunksSortMode : 'dependency'
        }),

        new ExtractTextPlugin({filename: 'css/[name].[hash].css', disable: false}),

        new webpack.NoEmitOnErrorsPlugin(),

        // new webpack.ProvidePlugin({
        //     jQuery          : 'jquery',
        //     $               : 'jquery',
        //     jquery          : 'jquery',
        //     'window.jQuery' : 'jquery',
        //     'window.$'      : 'jquery'
        // }),
    ]
};
