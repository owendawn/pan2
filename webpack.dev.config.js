const Path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const webpack=require('webpack')

const cfg = {
    // mode: 'production',
    mode: 'development',
    devtool:'#cheap-module-eval-source-map',
    target:'web',
    entry: Path.join(__dirname, "src/index.js"),
    output: {
        filename: 'bundle.[hash:8].js',
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
        new HtmlWebpackPlugin({
            template:'./template.html',
            filename:'index.html',
            inject:true,
            hash:true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
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

