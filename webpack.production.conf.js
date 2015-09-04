var webpack = require('webpack')
var webpackConf = require('./webpack.conf')

module.exports = function () {
    var copy = {}
    for (var prop in webpackConf) {
        if (webpackConf.hasOwnProperty(prop)) copy[prop] = webpackConf[prop]
    }
    return copy
}()

module.exports = extend({}, webpackConf, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify('production') }
        }),
        new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } })
    ]
})

function extend(obj) {
    Array.prototype.slice.call(arguments, 1).forEach(function (props) {
        Object.keys(props).forEach(function (prop) {
            obj[prop] = props[prop]
        })
    })
    return obj
}
