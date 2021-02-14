const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const outputDirectory = 'dist'

module.exports = {
    mode: 'development',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, outputDirectory),
        filename: 'bundle.js',
        publicPath: '/' // needed?
    },
    devServer: {
        // disableHostCheck: true,
        contentBase: "./src/index.html",
        hot: true,
        port: 9001,
        open: true,

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
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