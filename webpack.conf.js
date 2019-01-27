module.exports = {
    entry: __dirname + '/src/index.jsx',

    output: {
        path: __dirname + '/dist/',
        filename: 'snake.js'
    },

    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
}
