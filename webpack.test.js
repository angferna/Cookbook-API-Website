const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const fs = require('fs');

if (fs.existsSync('./server/config/environment/local.js')) {
    let localConfig = require('./server/config/environment/local.js');
    if (localConfig && localConfig.gcp) {
        process.env.GCP_CLIENT_API_KEY = localConfig.gcp.clientAPIKey;
    }
}

if (!process.env.GCP_CLIENT_API_KEY) {
    process.env.GCP_CLIENT_API_KEY = '';
}

/**
 * Webpack config for testing
 */
let config = require('./webpack.common')({
    BUILD: false,
    DEV: true,
    TEST: false
});

config.devtool = 'eval-cheap-module-source-map';
config.mode = 'development';

config.module = {
    rules: [
        {
            test: /\.(png|jpe?g|gif|cur|woff|woff2|ttf|eot|ico)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.svg$/,
            use: [
                'raw-loader'
            ]
        },
        {
            test: /\.html$/,
            use: [
                'to-string-loader'
            ]
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
            test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            use: [
                'ts-loader',
                'angular2-template-loader'
            ],
            exclude: path.resolve(__dirname, 'node_modules')
        }
    ]
};

config.plugins.push(
    new webpack.EnvironmentPlugin(['GCP_CLIENT_API_KEY']),
    new HtmlWebpackPlugin({
        template: 'client/app.template.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.SourceMapDevToolPlugin({
        filename: null,
        exclude: [/node_modules/],
        test: /\.ts($|\?)/i
    })
);

config.node = {
    global: true,
};

config.resolve.fallback = {
    clearImmediate: false,
    crypto: false,
    fs: false,
    module: false,
    net: false,
    process: require.resolve('process/browser'),
    setImmediate: false,
    tls: false
};

config.stats = {
    colors: true,
    reasons: true
};

config.optimization = {
    moduleIds: 'named',
    emitOnErrors: false,
    splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0
    }
};

module.exports = config;
