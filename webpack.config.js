const webpack = require('webpack');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        filename: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        assetModuleFilename: '[name][ext]'
    },
    performance: {
      hints: false,
      maxAssetSize: 512000,
      maxEntrypointSize: 512000
    },
    devServer: {
        compress: true,
        hot: true, // горячая перезагрузка
        static: {
            directory: path.join(__dirname, 'build')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader',  ]
            },
            {
                test: /\.(js)$/,
                use: 'babel-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource'
            },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/index.html',
        }),
        new HtmlWebpackPlugin({
          filename: 'report.html',
          template: './src/report.html',
        }),
        new HtmlWebpackPlugin({
            filename: 'task 2.html',
            template: './src/task 2.html',
          }),
        new HtmlWebpackPlugin({
          filename: 'task 3.html',
          template: './src/task 3.html',
        }),
        new HtmlWebpackPlugin({
          filename: 'task 4.html',
          template: './src/task 4.html',
        }),
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        })
      ],
}