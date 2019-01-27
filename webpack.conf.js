module.exports = {
    mode: 'development',

    entry: __dirname + '/src/index.jsx',

    output: {
        path: __dirname + '/dist/',
        filename: 'snake.js'
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
}
