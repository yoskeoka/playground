const autoprefixer = require("autoprefixer");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",

    devServer: {
        contentBase: "dist",
        watchContentBase: true,
        open: true,
        clientLogLevel: "none",
        historyApiFallback: {
            disableDotRule: false,
        },
    },
    module: {
        rules: [
            /**
             * Babel
             */
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                },
            },
            /**
             * Raw CSS resolve
             */
            {
                test: /\.s?css$/,
                use: [
                    "raw-loader",
                    "resolve-url-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            // Necessary for external CSS imports to work
                            // https://github.com/facebookincubator/create-react-app/issues/2677
                            ident: "postcss",
                            plugins: () => [
                                require("postcss-flexbugs-fixes"),
                                autoprefixer({
                                    browsers: ["> 1% in JP"],
                                    flexbox: "no-2009",
                                    grid: true,
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(ico|json)$/,
                include: path.resolve("public"),
                use: {
                    loader: "file-loader",
                    options: {
                        name: "./[name].[ext]",
                    },
                },
            },
        ],
    },

    plugins: [
        new FaviconsWebpackPlugin({
            logo: path.resolve("public", "logo_f_gcoka.png"),
            emitStats: false,
            persistentCache: true,
            inject: true,
        }),
        new HtmlWebpackPlugin({
            template: "public/index.ejs",
            // favicon: "public/favicon.ico",
            inject: true,
        }),
        new CopyWebpackPlugin(["public/favicon.ico", "public/manifest.json"]),
    ],
};
