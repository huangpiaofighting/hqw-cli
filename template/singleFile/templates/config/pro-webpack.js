const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "umd", //发布组件专用
    library: "HTool",
    path: path.resolve(__dirname, "../lib"),
    clean: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          // loader 是 babel
          loader: "babel-loader",
          options: {
            // babel 转义的配置选项
            babelrc: false,
            presets: [
              // 添加 preset-react
              [require.resolve("@babel/preset-env"), { modules: false }],
              require.resolve("@babel/preset-react")
            ],
            plugins: [
              require.resolve("@babel/plugin-transform-runtime"),
              require.resolve("@babel/plugin-proposal-class-properties")
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "hqw_[name]_[hash:base64:5]",
                namedExport: false
              }
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false
          }
        },
        extractComments: false
      })
    ]
  },
  performance: {
    //性能
    hints: "warning",
    maxEntrypointSize: 1024000, //1M
    maxAssetSize: 1024000
  }
};
module.exports = config;
