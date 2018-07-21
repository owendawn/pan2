const Path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const ExtractPlugin=require("extract-text-webpack-plugin")
const CleanWebpackPlugin=require("clean-webpack-plugin")


const cfg = {
    mode: 'production',
    // mode: 'development',
    target:'web',
    output: {
        filename: '[name].js',
        path: 'E:\\xampp\\htdocs\\pan2',
        // path: Path.join(__dirname, 'dist'),
    },
    entry:{
        // app:Path.join(__dirname,"src/page/main/index.js"),
        index:Path.join(__dirname, "src/page/main/index.js"),
        simple:Path.join(__dirname, "src/page/simple/index.js"),
        vendor:['vue']
    },
    // optimization :{
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 chunks: 'initial',
    //                 minChunks: 2,
    //                 maxInitialRequests: 5,
    //                 minSize: 0
    //             },
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: 'initial',
    //                 name: 'vendor',
    //                 priority: 10,
    //                 enforce: true
    //             },
    //         }
    //     },
    //     runtimeChunk: true
    // },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },{
                test:/\.jsx$/,
                loader: "babel-loader"
            },{
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'uv-[name].[ext]'
                        }
                    }
                ],
            }, {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },{
                test:/\.styl$/,
                use:ExtractPlugin.extract({
                    fallback:'style-loader' ,
                    use:[
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options:{
                                sourceMap:true,
                            }
                        },
                        'stylus-loader'
                    ]
                })
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new ExtractPlugin('styles.[contentHash:8].css'),
        new HtmlWebpackPlugin({
            template:'./template.html',
            filename:'index.html',
            chunks: [ 'index'],
            inject:true,
            chunksSortMode: 'dependency',
            hash:true,
        }),
        new HtmlWebpackPlugin({
            template:'./template.html',
            filename:'simple.html',
            chunks: [ 'simple'],
            inject:true,
            chunksSortMode: 'dependency',
            hash:true,
        }),
    ]
}

cfg.plugins.push(new CleanWebpackPlugin([cfg.output.path]))


module.exports=cfg

