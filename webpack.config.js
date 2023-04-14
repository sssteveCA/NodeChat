
const {join, resolve} = require('path');

const srcPath = join(__dirname,'src');
const distPath = join(__dirname,'dist');
const publicCssSrc = join(srcPath,'public','css');
const publicJsSrc = join(srcPath,'public','js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');

module.exports = {
    entry: {
        'css/aboutus': join(publicCssSrc,'aboutus.sass'),
        'css/code_verify': join(publicCssSrc,'code_verify.sass'),
        'css/contacts': join(publicCssSrc,'contacts.sass'),
        'css/footer': join(publicCssSrc,'footer.sass'),
        'css/index': join(publicCssSrc,'index.sass'),
        'css/login': join(publicCssSrc,'login.sass'),
        'css/menu': join(publicCssSrc,'menu.sass'),
        'css/rules': join(publicCssSrc,'rules.sass'),
        'css/subscribe': join(publicCssSrc,'subscribe.sass'),
        'css/terms': join(publicCssSrc,'terms.sass'),
        'css/verify': join(publicCssSrc,'verify.sass'),
        'css/logged/index_logged': join(publicCssSrc,'logged/index_logged.sass'),
        'css/logged/menu_logged': join(publicCssSrc,'logged/menu_logged.sass'),
        'css/logged/profile': join(publicCssSrc,'logged/profile.sass'),
        'css/logged/user_profile': join(publicCssSrc,'logged/user_profile.sass'),
        'js/contacts': join(publicJsSrc,'contacts.ts'),
        'js/footer': join(publicJsSrc,'footer.ts'),
        'js/login': join(publicJsSrc,'login.ts'),
        'js/menu': join(publicJsSrc,'menu.ts'),
        'js/subscribe': join(publicJsSrc,'subscribe.ts'),
        'js/verify': join(publicJsSrc,'verify.ts'),
        'js/logged/index_logged': join(publicJsSrc,'logged/index_logged.ts'),
        'js/logged/profile': join(publicJsSrc,'logged/profile.ts'),
        'js/logged/user_profile': join(publicJsSrc,'logged/user_profile.ts'),
    },
    output: {
        path: resolve(distPath,'public'),
        filename: '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: resolve(publicJsSrc,'tsconfig.json')
                        }
                    }
                ],
                exclude: [/node_modules/, /index.ts/,
                    join(srcPath,'classes'),
                    join(srcPath,'enums'),
                    join(srcPath,'modules'),
                    join(srcPath,'namespaces'),
                    join(srcPath,'policies'),
                    join(srcPath,'routes'),
                    join(srcPath,'types'),
                    ]
            },
            {
                test: /\.(css|s[ac]ss)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader'],
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {loader: 'sass-loader'}
                ],
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