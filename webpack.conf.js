module.exports = {
    entry: __dirname + '/src/index.jsx',

    output: {
        path: __dirname + '/dist/',
        filename: 'snake.js'
    },

    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: { optional: ['es7.decorators'] }
            }
        ]
    }
}
