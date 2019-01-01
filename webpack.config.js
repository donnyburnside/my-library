const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PLUGINS = [
    new MiniCssExtractPlugin({
      filename: IS_PRODUCTION ? '[name].min.css' : '[name].css'
    })
];

IS_PRODUCTION ? [
    // Production plugins
    PLUGINS.push(new OptimizeCSSAssetsPlugin({}))
] : [
    // Development plugins
    PLUGINS.push(new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        inject: 'head'
    }))
];


module.exports = {
    entry: {
        'my-library': path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (IS_PRODUCTION ? '[name].min.js' : '[name].js'),
        library: 'myLibrary'
    },
    mode: (IS_PRODUCTION ? 'production' : 'development'),
    devtool: (IS_PRODUCTION ? '' : 'source-map'),
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({ flexbox: 'no-2009' }),
                            ]
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: PLUGINS,
    devServer: {
        contentBase: __dirname,
        compress: true,
        port: 1337
    }
};
