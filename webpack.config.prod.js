'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports =  {
    entry: [
        './src/index.js',
    ],
    output: {
        path: path.join(__dirname, 'public', 'js'),
        filename: 'bundle.js'
    },
    cache: true,
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