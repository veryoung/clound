const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');

const base = require('./webpack.base');

const extractStylus = new ExtractTextPlugin({
    allChunks: true,
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const extractCss = new ExtractTextPlugin({
    allChunks: true,
    filename: "css.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});
const moduleCss = new ExtractTextPlugin({
    allChunks: true,
    filename: "css.[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = function (env) {
    return merge.strategy({
        plugins: 'prepend',
        entry: 'replace',
    })(base(env), {
        entry: {
            entry: './src/main.ts',
            vendor: ['vue', 'element-ui', 'vue-router']
        },
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
                    }),
                    exclude: /\.m\.css/
                },
                {
                    test: /\.m\.css/,
                    use: moduleCss.extract({
                        use: [{
                            loader: "css-loader",
                            options: {
                                minimize: true,
                                sourceMap: true,
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
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
            moduleCss,
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
                sourceMap: false,
                compress: {
                    warnings: false
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.bundle.js'
            })
        ]
    })
}