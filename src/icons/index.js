// 引入Vue和SvgIcon组件
import Vue from "vue";
import SvgIcon from "@/components/svgIcon/Index";
// 注册全局SvgIcon组件
Vue.component("svg-icon", SvgIcon);
// 获取当前svg目录下所有以.svg结尾的文件
const req = require.context("./svg", false, /\.svg$/);
// 解析获取的.svg文件的文件名称，并返回
const requireAll = (requireContext) => {
  console.log(req, requireContext.keys().map(requireContext));
  return requireContext.keys().map(requireContext);
};
// 调用解析函数
requireAll(req);
