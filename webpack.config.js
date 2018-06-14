const Path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlPlugin=require('html-webpack-plugin')
const webpack=require('webpack')
const ExtractPlugin=require("extract-text-webpack-plugin")

const isDev=process.env.NODE_ENV==='development'

const cfg = {
    mode: isDev?'development':'production',
    target:'web',
    entry: Path.join(__dirname, "src/index.js"),
    output: {
        filename: 'bundle,[hash:8].js',
        path: Path.join(__dirname, 'dist')
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new VueLoaderPlugin(),
        new HtmlPlugin({
            filename:'[name].html'
        })
    ]
}

if(isDev){
    cfg.module.rules.push({
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
    })
    cfg.devServer={
        port:8001,
        host:'0.0.0.0',
        overlay:{
            errors:true
        },
        open:false,
        hot:true
    }
    cfg.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options:{
                devTool:'#cheap-module-eval-source-map'
            }
        })
    )
}else{
    cfg.output.filename='[name].[chunkhash:8].js'
    cfg.module.rules.push({
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
    })
    cfg.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css')
    )
}

module.exports=cfg

