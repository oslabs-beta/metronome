const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    popup: path.resolve("src/popup/popup.jsx"),
    options: path.resolve("src/options/options.jsx"),
    background: path.resolve("src/background/background.js"),
    contentScript: path.resolve("src/contentScript/contentScript.js"),
    inject: path.resolve("src/inject/inject.js"),
    devtools: path.resolve("src/devtool/devtools.js"),
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
      {
        type: "asset/resource",
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve("src/static"), to: path.resolve("dist") },
      ],
    }),
    ...getHTMLPlugins(["popup", "options", "devtools"]),
  ],
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};

function getHTMLPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: "Metronome",
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
