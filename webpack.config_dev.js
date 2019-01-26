const webpack = require("webpack")
const path = require("path")
const extractTextWebpackPlugin = require('extract-text-webpack-plugin') //css 分离工具
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "development",
    // mode: "production",
    devtool: '#eval-source-map',
    entry: path.resolve(__dirname, "./src", "main.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        // publicPath: './',
        filename: "bundle.js"
    },
    devServer: { //本地服务器 热加载
        contentBase: path.resolve(__dirname, './dist'),
        // publicPath: path.resolve(__dirname, 'dist'),
        // noInfo:true, 
        openPage: './dist/index_bundle',
        hot: true,
        inline: true,
        port: 9000
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, 'node_modules'), //编译时，不需要编译哪些文件
                include: path.resolve(__dirname, 'src'), //在config中查看 编译时，需要包含哪些文件
                options: {
                    presets: ['env'] //按照最新的ES6语法规则去转换

                },
                // name:'./js/[name].js'
            },
            {
                test: /\.(gif|jpg|jpge|png|svg)$/,
                loader: 'url-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                options: {
                    limit: 8192
                },
                // name:'./img/[name].[ext]'
            },

             {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'url-loader',
                exclude: path.resolve(__dirname, 'node_modules'),
                // options: {
                //     limit: 8192
                // }
                // name:'./img/[name].[ext]'
            },

            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                // use:["style-loader","css-loader"],
                use: extractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                // name:'./css/[name].css'
            },
            {
                test: /\.scss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                 loader:"vue-style-loader!css-loader!sass-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: extractTextWebpackPlugin.extract({ use: 'css-loader' })
                    }
                }
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
        new extractTextWebpackPlugin({
            filename: 'styles.css',
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.ProvidePlugin({
        //     Mock: 'mockjs'
        // }),
        new HtmlWebpackPlugin({ //自动生成html
            title: "new Demo",
            hash: true,
            filename: path.resolve(__dirname, './dist/index.html'),
            template: 'index.html'
        }),
        new VueLoaderPlugin()
    ]
}