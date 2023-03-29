import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Measure from "./views/Measure.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Measure
    },
  ]
});
