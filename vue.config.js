const path = require("path"); // 引入node.js中专门操作路径的模块
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 引入压缩插件,需要先运行 `npm install --save-dev compression-webpack-plugin` 安装

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
// 引入打包分析插件,需要先运行 `npm install --save-dev webpack-bundle-analyzer` 安装

const os = require("os"); // 引入node.js中的操作系统相关模块
const ProductionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 设置需要gzip压缩的文件格式
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV); // 判断是否为生产环境

module.exports = {
  publicPath: IS_PROD ? "/prod-sub-path/" : "/", // 基本路径
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", // 放置静态资源的目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  indexPath: "index.html", // html输出路径
  filenameHashing: true, // 文件名是否使用hash值
  productionSourceMap: false, // 是否在构建后生成source map文件
  configureWebpack: (config) => {
    config.resolve = {
      extensions: [".js", ".json", ".vue"], // 自动添加文件名后缀
      alias: {
        vue: "vue/dist/vue.js",
        "@": path.resolve(__dirname, "./src"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@a": path.resolve(__dirname, "./src/assets"),
      },
    };

    // 生产环境相关配置
    if (IS_PROD) {
      // 开启 Gzip 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]", // 目标文件名
          algorithm: "gzip", // 压缩算法
          test: ProductionGzipExtensions, // 满足正则表达式的文件会被压缩
          threshold: 10240, // 只有大小大于该值的资源会被处理,单位是 bytes
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        })
      );

      // 打包分析
      if (process.env.IS_ANALYZE) {
        config.plugins.push(new BundleAnalyzerPlugin());
      }
    }

    // 代码分割
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: "initial",
          },
          common: {
            name: "chunk-common",
            minChunks: 2,
            priority: -20,
            chunks: "initial",
            reuseExistingChunk: true,
          },
        },
      },
    };

    // 关闭源码映射
    config.devtool = IS_PROD ? "none" : "cheap-module-eval-source-map";
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"],
      });
    // 需要先运行 `npm install --save-dev svg-sprite-loader` 安装 svg-sprite-loader

    config.plugins.delete("prefetch");
    config.plugins.delete("preload");

    // config.module
    //   .rule("images")
    //   .use("image-webpack-loader")
    //   .loader("image-webpack-loader")
    //   .options({
    //     bypassOnDebug: true,
    //   });
    // 需要先运行 `npm install --save-dev image-webpack-loader` 安装 image-webpack-loader

    config.devServer.disableHostCheck(process.env.NODE_ENV === "development");
  },
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 100, // 换算基数，默认100，这样的话把根标签的字体规定为1rem为100px
            exclude: /(node_module)/, // 排除node_modules目录下的文件
            mediaQuery: false, // 允许在媒体查询中转换px
            minPixelValue: 0, // 设置要替换的最小像素值
          }),
        ],
      },
      scss: {
        prependData: `@import "~@/styles/index.scss";`, // 会在每个scss文件顶部自动引入一次
      },
    },
    // 需要先运行 `npm install --save-dev postcss-plugin-px2rem` 安装 postcss-plugin-px2rem
  },
  parallel: require("os").cpus().length > 1, // 多核机器开启并行压缩
  devServer: {
    open: false, // 编译完成是否打开网页
    host: "0.0.0.0", // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false, // 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,
    proxy: {
      // 配置跨域
      [process.env.VUE_APP_API]: {
        target: process.env.VUE_API_DEV_TARGET, //API服务器的地址
        changeOrigin: true,
        // pathRewrite: {
        //   ["^" + process.env.VUE_APP_API]: "",
        // },
      },
    },
    overlay: {
      warnings: true,
      errors: true,
    },
    before: (app) => {},
  },
  pluginOptions: {}, // 第三方插件配置
};
