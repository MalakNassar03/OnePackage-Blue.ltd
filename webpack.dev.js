const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");





module.exports = {
    entry: './static/index.js',
    mode: 'development', // Set mode to 'development' or 'production'
    devtool: 'source-map',
    module: {
        rules: [
            {
            test: /\.js$/, // to find all the js script files
            exclude: /node_modules/,
            loader: "babel-loader"// let things be compatible with every browser
            },
            {
                test: /\.css$/, // to find all the js script files
                use: [MiniCssExtractPlugin.loader, // Extract CSS into separate files
                    'css-loader', // Handle CSS imports
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns:[
                {from: "./static/images", to:"./static/images"}
            ]
        })

    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'), // Define the output directory
        filename: 'main.js', // Define the output file name
    },


};