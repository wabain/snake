const webpack = require('webpack')
const webpackConf = require('./webpack.conf')

module.exports = Object.assign({}, webpackConf, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        })
    ]
})
