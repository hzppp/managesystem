module.exports = {
  // 配置项⽬启动端⼝及⾃动打开浏览器
  devServer: {
    port: 3333,
    open: true,
  },
  // 配置scss全局变量
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/_variable.scss";`,
      },
    },
  },
};
