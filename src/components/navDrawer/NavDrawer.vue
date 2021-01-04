<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    :expand-on-hover="$vuetify.breakpoint.mdAndUp"
  >
    <ListaRutas
      :rutas="rutas"
      colorIcon="black"
      colorActive="primary"
      v-on:logout="$emit('logout')"
    ></ListaRutas>
  </v-navigation-drawer>
</template>

<script lang="ts">
// decoradores
import { Component, Vue, Prop, Model } from "vue-property-decorator";
// componentes
import ListaRutas from "@/components/navDrawer/ListaRutas.vue";

interface Rutas {
  [id: string]: {};
}

@Component({
  components: {
    ListaRutas,
  },
})
export default class NavDrawer extends Vue {
  @Prop() readonly rutas!: Rutas;

  @Model("input", { type: Boolean }) readonly value!: boolean;

  get drawer() {
    return this.value;
  }

  set drawer(value) {
    this.$emit("input", value);
  }
}
</script>
