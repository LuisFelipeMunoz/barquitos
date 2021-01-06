<template>
  <v-list dense>
    <v-list-item-group v-model="selected">
      <v-list-item
        v-for="(ruta, index) in rutas"
        :key="index"
        :to="ruta.to"
        :color="colorActive"
        :value="ruta.to.name"
      >
        <template v-slot:default="{ active }">
          <v-list-item-action>
            <v-icon :color="active ? colorActive : colorIcon">{{
              ruta.icon
            }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ ruta.text }}</v-list-item-title>
          </v-list-item-content>
        </template>
      </v-list-item>
      <v-list-item @click="$emit('logout')">
        <v-list-item-action>
          <v-icon :color="colorActive">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title
            :class="'text-capitalize ' + colorActive + '--text'"
          >
            cerrar sesion
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script lang="ts">
// decoradores
import { Component, Vue, Prop } from "vue-property-decorator";

interface Rutas {
  [id: string]: {
    icon: string;
    text: string;
    to?: { name: string };
  };
}

@Component
export default class ListaRutasNavDrawer extends Vue {
  @Prop() rutas!: Rutas;
  @Prop() colorActive?: string;
  @Prop() colorIcon?: string;

  selected = this.$route.name;
}
</script>
