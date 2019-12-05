const fs = require("fs")
const path = require("path")
const { ProvidePlugin } = require("webpack")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { VueLoaderPlugin } = require("vue-loader")


const paths = {
    src: path.join(__dirname, "../src"),
    dist: path.join(__dirname, "../dist")
}

const dirs = {
    static: "static",
    pages: "pages"
}


const getPages = () => {
    const dir = `${paths.src}/${dirs.pages}`

    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => fs.lstatSync(`${dir}/${f}`).isFile())
        const pages = files.filter(f => /\.(html|pug)$/.test(f))

        const result = pages.map(page => new HtmlWebpackPlugin({
            template: `${dir}/${page}`,
            filename: page.replace(/\.pug$/, ".html")
        }))

        return result
    } else {
        return []
    }
}


const styleLoaders = [
    MiniCssExtractPlugin.loader,
    {
        loader: "css-loader",
        options: {
            sourceMap: true,
            importLoaders: 1
        }
    },
    {
        loader: "postcss-loader",
        options: {
            sourceMap: true,
            plugins: [
                require("autoprefixer")({
                    overrideBrowserslist: ["> 1%", "last 2 version"]
                }),
                require("cssnano")
            ]
        }
    }
]


module.exports = {
    target: "web",
    externals: { paths },
    entry: {
        app: `${paths.src}/app.js`
    },
    output: {
        filename: "js/[name].[hash:8].js",
        path: paths.dist,
        publicPath: "/"
    },
    stats: {
        all: false,
        version: false,
        errors: true,
        errorDetails: true
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "vendors",
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    resolve: {
        alias: {
            "~": paths.src,
            "@": paths.src
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash:8].css"
        }),
        ...getPages(),
        new CopyWebpackPlugin([
            {
                from: `${paths.src}/${dirs.static}`,
                to: ""
            }
        ]),
        new ProvidePlugin({
            _: "lodash"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.pug$/,
                oneOf: [
                    {
                        resourceQuery: /^\?vue/,
                        use: ["pug-plain-loader"]
                    },
                    {
                        use: [
                            "raw-loader",
                            "pug-plain-loader"
                        ]
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    ...styleLoaders,
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    ...styleLoaders,
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: styleLoaders
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
            {
                test: /\.(eot|otf|ttf|woff2?|svg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]"
                    }
                }
            }
        ]
    }
}
