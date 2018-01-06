module.exports = {
    entry: {
        index: "./js/index.js"
    },
    output: {
        filename: "[name].js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js"]
    },
    module: {
        rules: [
            {
                test: /(\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
};