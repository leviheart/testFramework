import Vue from "vue";
import Router from "vue-router";
import Home from "./views/scroll.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/maps/page1",
      component: () => import("@/views/maps/page1.vue"),
      name: "page1",
    },
    {
      path: "/maps/page2",
      component: () => import("@/views/maps/page2.vue"),
      name: "page2",
    },
    {
      path: "/leftTree",
      component: () => import("@/views/leftTree.vue"),
      name: "leftTree",
    },
    {
      path: "/maps/page4",
      component: () => import("@/views/maps/page4.vue"),
      name: "page4",
    },
    {
      path: "/maps/page5",
      component: () => import("@/views/maps/page5.vue"),
      name: "page5",
    },
    {
      path: "/maps/page6",
      component: () => import("@/views/maps/page6.vue"),
      name: "page6",
    },
    {
      path: "/maps/page7",
      component: () => import("@/views/maps/page7.vue"),
      name: "page7",
    },
    {
      path: "/scroll",
      component: () => import("@/views/scroll.vue"),
      name: "scroll",
    },
    {
      path: "/AmapProject",
      component: () => import("@/components/AmapProject.vue"),
      name: "AmapProject",
    },
    {
      path: "/componentInput",
      component: () => import("@/components/componentInput.vue"),
      name: "componentInput",
    },
    {
      path: "/DeepCopy",
      component: () => import("@/components/DeepCopy.vue"),
      name: "DeepCopy",
    },
    {
      path: "/descriptions",
      component: () => import("@/components/descriptions.vue"),
      name: "descriptions",
    },
    {
      path: "/HelloWorld",
      component: () => import("@/components/HelloWorld.vue"),
      name: "HelloWorld",
    },
    {
      path: "/Label",
      component: () => import("@/components/Label.vue"),
      name: "Label",
    },
    {
      path: "/PropsCom",
      component: () => import("@/components/PropsCom.vue"),
      name: "PropsCom",
    },
    {
      path: "/searchBar",
      component: () => import("@/components/searchBar.vue"),
      name: "searchBar",
    },
  ],
});
