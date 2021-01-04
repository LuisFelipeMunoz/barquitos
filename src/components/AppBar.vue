<template>
  <v-app-bar :color="color" app clipped-left :dark="dark">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mdAndDown"
      @click.stop="$emit('click-nav-icon')"
    ></v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-toolbar-title class="text-uppercase headline font-weight-thin">
      {{ title }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
// decoradores
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AppBar extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly color!: string;
  @Prop() readonly dark!: boolean;
}
</script>
