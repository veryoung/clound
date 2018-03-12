const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = function (env) {
    return {
        entry: './src/main.ts',
        resolve: {
            extensions: ['.ts', '.js', '.styl', '.css', '.json'],
            alias: {
                'src': path.resolve(__dirname, '../src'),
                'vue$': 'vue/dist/vue.esm.js',
                '@views': 'src/views/',
                '@components': 'src/components/',
                '@router': 'src/router/',
                '@store': 'src/store/',
                '@directives': 'src/directives',
                '@utils': 'src/utils',
                '@server': 'src/server',
                '@filters': 'src/filters',
            }
        },
        module: {
            rules: [{
                    test: /\.ts$/,
                    exclude: /node_modules/,
                    enforce: 'pre',
                    loader: 'tslint-loader'
                },
                {
                    test: /\.ts$/,
                    exclude: /node_modules|vue\/src/,
                    loader: 'awesome-typescript-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        esModule: true,
                        loaders: {
                            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                            // the "scss" and "sass" values for the lang attribute to the right configs here.
                            // other preprocessors should work out of the box, no loader config like this necessary.
                            'scss': 'vue-style-loader!css-loader!sass-loader',
                            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        }
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [path.resolve(__dirname, '../index.html')]
                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: 'url-loader?limit=8192&name=[path][name].[ext]'
                },
            ]
        },
        devtool: 'cheap-module-eval-source-map',
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: path.resolve(__dirname, '../index.html'),
                chunksSortMode: 'dependency',
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    PLATFORM: JSON.stringify(process.env.PLATFORM),
                    NODE_ENV: JSON.stringify(env)
                }
            })
        ]
    }
}