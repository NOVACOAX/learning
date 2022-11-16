const path = require('path');

module.exports ={
    // Entry point
    entry: './src/script1.js',

    // Output point
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules:[
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },

};

