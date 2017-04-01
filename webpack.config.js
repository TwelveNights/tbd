let path = require('path')

module.exports = {
    entry: "./web/src/index.js",
    output: {
        filename: "script.js",
        path: path.resolve(__dirname, "web", "dist", "js")
    },

    devtool: "source-map",
    resolve: {
        extensions: [".js", ".min.js", ".jsx", ".css", ".min.css"]
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
    }
}
