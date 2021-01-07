import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import EmbarcacionesDisponibles from "@/views/EmbarcacionesDisponibles.vue";
import ArriendosPendientes from "@/views/ArriendosPendientes.vue";
import Usuarios from "@/views/Usuarios.vue";
import Seguros from "@/views/Seguros.vue";
import Embarcaciones from "@/views/Embarcaciones.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/embarcaciones/disponibles",
    name: "embarcaciones.disponibles",
    component: EmbarcacionesDisponibles,
  },
  {
    path: "/arriendos/pendientes",
    name: "arriendos.pendientes",
    component: ArriendosPendientes,
  },
  {
    path: "/usuarios",
    name: "usuarios",
    component: Usuarios,
  },
  {
    path: "/seguros",
    name: "seguros",
    component: Seguros,
  },
  {
    path: "/embarcaciones",
    name: "embarcaciones",
    component: Embarcaciones,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
