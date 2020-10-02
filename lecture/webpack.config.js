const path = require('path');
 
module.exports = {
    name: 'WordRelaySetting',
    mode: 'development',//실서비스 : production
    devtool: 'eval',//빠르게
    resolve:{
        extensions: ['.js','.jsx'],
    },
    entry:{
        app:['./client.jsx'],
    }, //입력
    module:{
        rules:[
            {
                test:/\.jsx?/,
                loader:'babel-loader',
                options:{
                    presets:[
                        '@babel/preset-env', '@babel/preset-react'
                    ]
                }
            }
        ]
    },
    output:{
        path:path.join(__dirname,'dist')
    },//출력
}