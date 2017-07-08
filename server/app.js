var express = require('express');
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');

// Load environment variables from .env
require('dotenv').config();

var app = express();
var environment = process.env.NODE_ENV;
var webpackConfig = require('../webpack.config.js');
var config = webpackConfig[environment];


app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    filename: config.output.filename,
    hot: true,
    publicPath: config.output.publicPath,
    stats: { 
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  
}




app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

var server = app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${process.env.PORT}`);
  }
});