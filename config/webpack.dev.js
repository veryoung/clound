const merge = require('webpack-merge');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const base = require('./webpack.base');


module.exports = function (env) {
    return merge.smart(base(env), {
        devServer: {
            noInfo: true,
            proxy: [{
                context: ["/portal/api/v20/", "/api/v20/"],
                target: "http://10.10.200.232:8080",
                changeOrigin: true,
                secure: false,
            }, {
                context: ["/middleware","/templates"],
                target: "http://127.0.0.1:3000",
                changeOrigin: true,
                secure: false,
            }],
            port: process.env.PLATFORM === 'portal' ? 7000 : 8000
            // hot: true
        },
        module: {
            rules: [{
                    test: /\.styl$/,
                    use: [{
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader'
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                plugins: () => [autoprefixer]
                            }
                        },
                        {
                            loader: 'stylus-loader?paths=src/resource/',
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        }
                    ],
                    exclude: /\.m\.css$/
                },
                {
                    test: /\.m\.css$/,
                    use: [{
                            loader: 'style-loader'
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [autoprefixer]
                            }
                        }
                    ],
                }
            ]
        },
        // plugins: [
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin()
        // ]
    })
}