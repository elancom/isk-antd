// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const config = {
  entry: "./lib/index.js",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: 'index.js',
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    // 修改配置
    // new CleanWebpackPlugin(),
    // END
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".ts", "..."],
    // 修改配置
    alias: {
      "@": require('path').resolve("src"),
    }
    // END
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
