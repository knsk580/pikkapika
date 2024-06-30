const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    cache: true,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
}
