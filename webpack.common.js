const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
    new Dotenv(),
  ],
  module: {
    rules: [
      //rule which grants us the ability to read our css file and it be applied to the js file
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      //rule for being able to use paths to files as the src attribute to an img element
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      //rule for being able to import image files to use in our js file
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
