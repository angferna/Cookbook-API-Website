const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const {AngularWebpackPlugin} = require('@ngtools/webpack');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

if (!process.env.GCP_CLIENT_API_KEY) {
    process.env.GCP_CLIENT_API_KEY = '';
}

/**
 * Webpack config for builds
 */
let config = require('./webpack.common')({
    BUILD: true,
    DEV: false,
    TEST: false
});

config.devtool = 'source-map';
config.mode = 'production';

config.module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|cur|woff|woff2|ttf|eot|ico|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.html$/,
            use: [
                {
                    loader: 'html-loader',
                    options: {minimize: {caseSensitive: true}}
                }
            ],
        },
        {
            test: /\.css$/,
            use: [
                {
                    loader: 'to-string-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },
        {
            test: /\.(scss|sass)$/,
            use: [
                {
                    loader: 'to-string-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-resources-loader',
                    options: {
                        sourceMap: true,
                        resources: './client/app/variables.scss'
                    }
                }
            ],
            exclude: [
                path.resolve(__dirname, 'client/app/app.scss')
            ]
        },
        {
            test: /\.(scss|sass)$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-resources-loader',
                    options: {
                        sourceMap: true,
                        resources: './client/app/variables.scss'
                    }
                }
            ],
            include: [
                path.resolve(__dirname, 'client/app/app.scss')
            ]
        },
        {
            test: /\.tsx?$/,
            use: [
                'source-map-loader'
            ],
            enforce: 'pre'
        },
        {
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.tsx?)$/,
            use: [
                '@ngtools/webpack'
            ]
        }
    ]
};

config.plugins.push(
    new webpack.EnvironmentPlugin(['GCP_CLIENT_API_KEY']),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './client/app.template.html'),
        filename: path.resolve(__dirname, './dist/client/app.html')
    }),
    new AngularWebpackPlugin({
        entryModule: path.resolve(__dirname, './client/app/app.module#AppModule'),
        sourceMap: true,
        tsconfig: 'tsconfig.json',
    }),
    new webpack.SourceMapDevToolPlugin({
        exclude: [/node_modules/],
        test: /\.ts($|\?)/i
    })
);

config.optimization = {
    emitOnErrors: false,
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0
    },
    runtimeChunk: 'single',
    minimizer: [
        new TerserPlugin({
            parallel: true,
        }),
        new CssMinimizerPlugin()
    ]
};

module.exports = config;
