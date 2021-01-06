import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "../views/Login.vue";
import Barcos from "../views/Barcos.vue";
import ArriendosPendientes from "../views/ArriendosPendientes.vue";

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
  {
    path: "/arriendos/pendientes",
    name: "arriendos.pendientes",
    component: ArriendosPendientes,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
