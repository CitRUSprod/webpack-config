const merge = require("webpack-merge")

const baseConfig = require("./base.config")


const prodConfig = merge(baseConfig, {
    mode: "production"
})


module.exports = new Promise(resolve => {
    resolve(prodConfig)
})
