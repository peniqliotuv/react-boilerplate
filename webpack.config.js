'use strict';

const webpack = require('webpack');
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

const devConfig = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        publicPath: '/js/',
        filename: 'bundle.js'
    },
    cache: true,
    devtool: '#eval-source-map',
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loaders: ['react-hot-loader/webpack', 'babel-loader']
        }, 
        {
            test: /\.(scss|sass)$/,
            loader: 'style-loader!css-loader?modules!sass-loader?outputStyle=expanded'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader' 
        },
        {
            test: /\.(png|jpg|woff|woff2|gif)$/, 
            loader:'url-loader?limit=8192&prefix=/'
        }
        ]
    },
    devServer: {
        inline: true,
        hot: true
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true,
        }),
    ],
};

const prodConfig = {
    entry: [
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'bundle.js'
    },
    cache: true,
    devtool: 'source-map',
    stats: {
        colors: true,
        reasons: true
    },
    module: {
        loaders: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, 
        {
            test: /\.(scss|sass)$/,
            loader: 'style-loader!css-loader?modules!sass-loader?outputStyle=expanded'
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader' 
        },
        {
            test: /\.(png|jpg|woff|woff2|gif)$/, 
            loader:'url-loader?limit=8192&prefix=/'
        }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
        debug: false
        }),
        new webpack.optimize.UglifyJsPlugin(), //minify everything
        new webpack.optimize.AggressiveMergingPlugin()//Merge chunks 
    ],
};

module.exports = {
  'development': devConfig,
  'production': prodConfig, 
};