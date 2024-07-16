const path = require('path');

module.exports = {
  // Your existing configuration
  module: {
    rules: [
      // Your existing rules
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: [
          /node_modules\/timeago\.js\//, // Exclude timeago.js from source map loader
        ],
      },
    ],
  },
};
