const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }, // Rule for processing text files
      { test: /\.pdf$/, use: 'file-loader' }, // Rule for processing PDF files
    ],
  },
};
