const webpackConf = require('./webpack.conf')

module.exports = Object.assign({}, webpackConf, {
    mode: 'production'
})
