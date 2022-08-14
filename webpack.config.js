const path = require('path');

module.exports = {
  entry: {
    secondaryIndex: { import: './src/secondary-index.js', filename: 'secondary-index.js' },
    index: { import: './src/index.js', filename: '[name].js' },
    helper: { import: './public/js/helper.js', filename: '[name].js' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),

  },
 

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ], plugins: [
              ["@babel/plugin-transform-runtime", { "regenerator": true }
              ]
            ]
          }
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/public/icons/[name].[ext]'
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
};