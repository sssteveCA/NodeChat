
const {join, resolve} = require('path');

const srcPath = join(__dirname,'src');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    entry: {

    },
    output: {
        path: resolve(__dirname,'dist/public'),
        filename: '{name}.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/,
                    ]
            },
            {
                test: /\.(css|s[ac]ss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
                exclude: [ /node_modules/]
            }
        ]
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}