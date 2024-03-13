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
      path: "/maps/page3",
      component: () => import("@/views/maps/page3.vue"),
      name: "page3",
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
      // component: () => import("@/views/maps/page7.vue"),
      component: () => import("@/components/Three.vue"),
      name: "page6",
    },
  ],
});
