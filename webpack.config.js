let path = require('path');

module.exports = {
    entry: "./web/src/index.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "web", "dist")
    },

    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx"]
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    devServer: {
        contentBase: path.join(__dirname, "web", "dist"),
        publicPath: "/public/js/",
        proxy: {
            '/api/v1': {
                target: "http://localhost:5000",
                pathRewrite: { "^/api/v1": "" }
            }
        }
    }
}
