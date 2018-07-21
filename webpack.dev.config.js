const Path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const webpack=require('webpack')

const cfg = {
    // mode: 'production',
    mode: 'development',
    devtool:'#cheap-module-eval-source-map',
    target:'web',
    entry:{
        "video":Path.join(__dirname, "src/page/main/index.js"),
        "login":Path.join(__dirname, "src/page/simple/index.js"),
    },
    output: {
        // filename: 'bundle.[hash:8].js',
        path: 'E:\\xampp\\htdocs\\pan2',
        // path: Path.join(__dirname, 'dist'),
    },
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
            }, {
                test:/\.styl$/,
                use:[
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            template:'./template.html',
            filename:'index.html',
            chunks:["video"],
            inject:true,
            hash:true,
        }),
        new HtmlWebpackPlugin({
            template:'./template.html',
            filename:'login.html',
            chunks:["login"],
            inject:true,
            hash:true,
        }),
    ],
    devServer:{
        port:8001,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        open:false,
        hot:true
    }
}



module.exports=cfg

