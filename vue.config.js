const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "./", dir);
}
module.exports = {
  chainWebpack: config => {
    // 这里是对环境的配置,不同环境对应不同的BASE_URL,以便axios的请求地址不同
    config.plugin("define").tap(args => {
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      return args;
    });
    {
      // svg loader
      const svgRule = config.module.rule("svg"); // 找到svg-loader
      svgRule.uses.clear(); // 清除已有的loader, 如果不这样做会添加在此loader之后
      svgRule.exclude.add(/node_modules/); // 正则匹配排除node_modules目录
      svgRule // 添加svg新的loader处理
        .test(/\.svg$/)
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({
          symbolId: "icon-[name]"
        });

      // 修改images loader 添加svg处理
      const imagesRule = config.module.rule("images");
      imagesRule.exclude.add(resolve("src/icons"));
      config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
    }
  },
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  // 输出文件目录
  outputDir: "dist",
  // 生产环境是否生成 sourceMap 文件 不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  // 配置 webpack-dev-serve 行为
  devServer: {
    port: 9527,
    open: true
  }
};
