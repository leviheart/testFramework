import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.scss";
// svgicon
import "@/icons";
import { svgWheel, svgDrag } from "@c/directive/Index.js";

import { Button, Select, Dialog, Input, Form, FormItem } from "element-ui";
import eChartFn from "@/components/chart/index.js";
import ChartPanel from "@/components/chart/index.vue";
import "lib-flexible"; // 移动端适配 (目录: hello-world/src/main.js)
console.log(ChartPanel);
Vue.component(ChartPanel.name, ChartPanel);
Vue.prototype.$eChartFn = eChartFn;

Vue.use(Button);
Vue.use(Select);
Vue.use(Dialog);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);

Vue.use(svgWheel);
Vue.use(svgDrag);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
