<template>
  <v-app>
    <template v-if="ruta != 'login'">
      <AppBar
        color="primary"
        title="barquitos"
        :dark="true"
        @click-nav-icon="nav = !nav"
      ></AppBar>
      <NavDrawer :rutas="rutas" v-model="nav" @logout="logout"></NavDrawer>
    </template>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">

//componente raiz de la aplicacion 

import { Component, Vue } from "vue-property-decorator";
import AppBar from "@/components/AppBar.vue";
import NavDrawer from "@/components/navDrawer/NavDrawer.vue";

@Component({
  components: {
    AppBar,
    NavDrawer,
  },
})
export default class Home extends Vue {
  nav = true;

  get ruta() {
    return this.$route.name;
  }

  get rutas() {
    if (this.ruta == "arriendos.pendientes") {
      return [
        {
          icon: "mdi-home",
          text: "arriendos",
          to: { name: "arriendos.pendientes" },
        },
      ];
    }
    return [
      {
        icon: "mdi-home",
        text: "embarcaciones",
        to: { name: "embarcaciones.disponibles" },
      },
    ];
  }

  logout() {
    this.$router.push({ name: "login" });
  }
}
</script>
