const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const base = require('./webpack.base');
console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const extractStylus = new ExtractTextPlugin({
    filename: "stylus.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const extractCss = new ExtractTextPlugin({
    filename: "css.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = function (env) {
    return merge.strategy({
        plugins: 'prepend',
    })(base(env), {
        devtool: '#source-map',
        module: {
            rules: [{
                    test: /\.styl$/,
                    use: extractStylus.extract({
                        use: [{
                                loader: "css-loader",
                                options: {
                                    minimize: true,
                                    sourceMap: true,
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true,
                                    plugins: () => [autoprefixer]
                                }
                            },
                            {
                                loader: "stylus-loader",
                                options: {
                                    outputStyle: 'expanded',
                                    sourceMap: true,
                                    sourceMapContents: true
                                }
                            }
                        ],
                    })
                },
                {
                    test: /\.css$/,
                    use: extractCss.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                sourceMap: true,
                            }
                        }],
                    })
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin([
                'dist',
            ], {
                root: path.resolve(__dirname, '../'),
                verbose: false,
                watch: true
            }),
            extractStylus,
            extractCss,
            // new CopyWebpackPlugin([{
            //         from: './src/assets/ip.svg',
            //         to: './src/assets/ip.svg'
            //     },
            //     {
            //         from: './src/assets/domain.svg',
            //         to: './src/assets/domain.svg'
            //     },
            //     {
            //         from: './src/assets/sample.svg',
            //         to: './src/assets/sample.svg'
            //     },
            //     {
            //         from: './src/assets/whoisemail.svg',
            //         to: './src/assets/whoisemail.svg'
            //     },
            //     {
            //         from: './src/assets/whoisname.svg',
            //         to: './src/assets/whoisname.svg'
            //     },
            // ]),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            })
        ]
    })
}