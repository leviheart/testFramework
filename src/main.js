import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";
// svgicon
import "@/icons";
import { svgWheel, svgDrag } from "@c/directive/Index.js";

// import {
//   Button,
//   Select,
//   Dialog,
//   Input,
//   Form,
//   FormItem,
//   Scrollbar,
//   Tag,
//   Option,
//   Tree
// } from "element-ui";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import eChartFn from "@/components/chart/index.js";
import ChartPanel from "@/components/chart/index.vue";
import "lib-flexible"; // 移动端适配 (目录: hello-world/src/main.js)
import VueAMap from "vue-amap";
import * as echarts from "echarts";
// import GlobalRouteHooks from './plugins/global-route-hooks';
Vue.prototype.$echarts = echarts;

console.log(ChartPanel);
Vue.component(ChartPanel.name, ChartPanel);
Vue.prototype.$eChartFn = eChartFn;

Vue.use(ElementUI);
// Vue.use(GlobalRouteHooks, {
//   pagesToOperate: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
// });

// Vue.use(Button);
// Vue.use(Select);
// Vue.use(Dialog);
// Vue.use(Input);
// Vue.use(Form);
// Vue.use(FormItem);
// Vue.use(Scrollbar);
// Vue.use(Tag);
// Vue.use(Option);
// Vue.use(Tree);

Vue.use(svgWheel);
Vue.use(svgDrag);
Vue.config.productionTip = false;

//注册高德
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "eb5690f2fed881fb7927cd3de8525c9c", //这里是你的高德开发者key
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
  ],
  v: "1.4.4",
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
