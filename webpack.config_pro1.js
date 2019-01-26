const webpack = require("webpack")
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const cleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//分离css插件
const optimizeCss = require('optimize-css-assets-webpack-plugin');//压缩css插件
module.exports = {
    mode: "production",
    entry: {
        main:path.resolve(__dirname, "./src", "main.js")
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "./js/[name].[chunkhash:6].js"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](vue|vuex|vue-router)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },

    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件
                include: path.resolve(__dirname, 'src'), //在config中查看 编译时，需要包含哪些文件
                options: {
                    presets: ['env'] //按照最新的ES6语法规则去转换
                }
            },
            {
                test: /\.(gif|jpg|jpge|png|svg)$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "[name][hash:6].[ext]",
                        outputPath: "image/",
                        limit: 2048
                    }
                }]

            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'url-loader',
                exclude: path.resolve(__dirname, 'node_modules')
            },

            {
                test: /\.(sa|sc|c)ss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },

            {
                test: /\.vue$/,
                loader: 'vue-loader',
            }

        ]
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.js',
            '@': path.resolve(__dirname, 'src'),
        }
    }, //有时候vue会无法使用,必须加这个

    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/styles.[chunkhash:6].css'
        }),
        new optimizeCss(),
        new HtmlWebpackPlugin({ //自动生成html
            title: "new Demo",
            // hash: true,
            filename: path.resolve(__dirname, './dist/index.html'),
            template: 'index.html',
            chunks: ["vendor","main" ]
        }),
        new VueLoaderPlugin(),
        // new webpack.HashedModuleIdsPlugin(),
        new cleanWebpackPlugin(["dist"])
    ]
}