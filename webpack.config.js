module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './app.js',
  output: {
    filename: 'app.js',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        // SASS
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles SASS to CSS
          "sass-loader",
        ],
      },

      // Load HTML files from local storage.
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
