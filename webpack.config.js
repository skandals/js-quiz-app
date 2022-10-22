module.exports = {

    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: 'quiz.js',
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }

}