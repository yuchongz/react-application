/*
* @Author: yucho
* @Date:   2018-03-22 16:20:58
* @Last Modified by:   yucho
* @Last Modified time: 2018-03-22 23:41:54
*/
const path = require('path');
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
    entry: {
        'app': path.resolve(__dirname, "app/index.js")
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, "dist"),
        publicPath: '/'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, "node_modules")
                ],
                loader: 'babel-loader',
                query:
                {
                  presets:['react','es2015']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: 'react音乐播放器',
            filename: path.join(__dirname, "dist/index.html"),
            template: './index.html',
            inject: true,
            hash: true,
            chunks: ['app']
        })
    ],
    devServer: {
        inline: true,
        historyApiFallback: true
    }
};

module.exports = config;