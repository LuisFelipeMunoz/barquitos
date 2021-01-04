import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Barcos from "../views/Barcos.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/barcos",
    name: "barcos",
    component: Barcos,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
