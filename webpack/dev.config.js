const { SourceMapDevToolPlugin } = require("webpack")
const merge = require("webpack-merge")

const baseConfig = require("./base.config")


const devConfig = merge(baseConfig, {
    mode: "development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        contentBase: baseConfig.externals.paths.dist,
        overlay: true
    },
    plugins: [
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        })
    ]
})


module.exports = new Promise(resolve => {
    resolve(devConfig)
})
