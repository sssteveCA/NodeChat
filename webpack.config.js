
const {join, resolve} = require('path')

const srcPath = join(__dirname,'src')
const distPath = join(__dirname,'dist')
const srcCss = join(srcPath,'public','css')
const srcJs = join(srcPath,'public','js')
const srcImg = join(srcPath,'public','img')
const srcFonts = join(srcPath,'public','fonts')
const srcImgDist = join(distPath,'public','img')
const srcFontsDist = join(distPath,'public','fonts');

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        'css/aboutus': join(srcCss,'aboutus.sass'),
        'css/code_verify': join(srcCss,'code_verify.sass'),
        'css/contacts': join(srcCss,'contacts.sass'),
        'css/footer': join(srcCss,'footer.sass'),
        'css/index': join(srcCss,'index.sass'),
        'css/login': join(srcCss,'login.sass'),
        'css/menu': join(srcCss,'menu.sass'),
        'css/rules': join(srcCss,'rules.sass'),
        'css/subscribe': join(srcCss,'subscribe.sass'),
        'css/terms': join(srcCss,'terms.sass'),
        'css/verify': join(srcCss,'verify.sass'),
        'css/logged/index_logged': join(srcCss,'logged/index_logged.sass'),
        'css/logged/menu_logged': join(srcCss,'logged/menu_logged.sass'),
        'css/logged/profile': join(srcCss,'logged/profile.sass'),
        'css/logged/user_profile': join(srcCss,'logged/user_profile.sass'),
        'js/contacts': join(srcJs,'contacts.ts'),
        'js/footer': join(srcJs,'footer.ts'),
        'js/login': join(srcJs,'login.ts'),
        'js/menu': join(srcJs,'menu.ts'),
        'js/subscribe': join(srcJs,'subscribe.ts'),
        'js/verify': join(srcJs,'verify.ts'),
        'js/logged/index_logged': join(srcJs,'logged/index_logged.ts'),
        'js/logged/profile': join(srcJs,'logged/profile.ts'),
        'js/logged/user_profile': join(srcJs,'logged/user_profile.ts'),
    },
    output: {
        path: resolve(distPath,'public'),
        filename: '[name].js',
        clean: true,
        assetModuleFilename: '[file]'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: resolve(srcJs,'tsconfig.json')
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
            },
            {
                test: /\.(jpe?g|jfif|png|gif|ttf)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new FixStyleOnlyEntriesPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyPlugin({
            patterns: [
                { from: srcImg, to: srcImgDist },
                { from: srcFonts, to: srcFontsDist}
            ]
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}