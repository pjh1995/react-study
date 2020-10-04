const path = require('path');
const webpack = require('webpack');

module.exports = {
    name: 'minesweeper',
    mode: 'development', //실서비스 : production
    devtool: 'eval', //빠르게
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    entry: {
        app: ['./jsx/client'],
    }, //입력
    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: {
                                    browsers: ['> 5% in KR'], //kr 사용자의 5%미만이 사용하는 브라우저는 지원하지 않겠다!
                                },
                                debug: true,
                            },
                        ],
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel'],
                },
            },
        ],
    },
    plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    }, //출력
};
