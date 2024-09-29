const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");







module.exports = {
    entry: './static/index.js',
    mode: 'production', // Set mode to 'development' or 'production'
    module: {
        rules: [
            {
                test: /\.js$/, // to find all the js script files
                exclude: /node_modules/,
                loader: "babel-loader"// let things be compatible with every browser
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]',
                    publicPath: '/blue/dist/'
                },
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[name].[hash].[ext]',
                //             outputPath: 'images/',
                //         },
                //     },
                // ],
            },
            {
            test: /\.css$/,
                use: ["style-loader", "css-loader", ],
            },

        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new HtmlWebPackPlugin({
            template: "./form.html",
            filename: "./form.html",
        }),


    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
            new CopyPlugin({
                patterns:[
                    {from: "./static/images", to:"images"}
                ]
            })
            // new ImageMinimizerPlugin({
            //     minimizer: {
            //         implementation: ImageMinimizerPlugin.imageminMinify,
            //         options: {
            //             plugins: [
            //                 ["gifsicle", {interlaced: true}],
            //                 ["jpegtran", {progressive: true}],
            //                 ["optipng", {optimizationLevel: 5}],
            //             ],
            //         },
            //     },
            // }),
        ],
    },

    output: {
        path: path.resolve(__dirname, 'dist'), // Define the output directory
        filename: 'main.js', // Define the output file name
        publicPath: '/dist/',  // Ensure Webpack is looking for assets in the 'dist' folder

    },



};