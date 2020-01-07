export default {
  // 将路由模式改为hash路由
  history: "hash",
  plugins: [
    [
      "umi-plugin-react",
      {
        //设置项目中可以使用antd样式和dva
        antd: true,
        dva: { immer: true }
      }
    ]
  ],
  publicPath: './'
};
