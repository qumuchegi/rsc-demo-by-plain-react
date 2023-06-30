const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ReactServerWebpackPlugin = require('react-server-dom-webpack/plugin')

module.exports = {
  mode: "development",
  entry: {
    index: "./components/index.client.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
        },
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      inject: true,
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    // 用于识别客户端组件（带 client.js 后缀的文件），生成 react-client-manifest.json 文件
    // 这个文件保存对所有客户端组件模块的引用
    new ReactServerWebpackPlugin({isServer: false}),
  ]
};

