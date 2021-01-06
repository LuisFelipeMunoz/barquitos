<template>
  <v-snackbar :color="color" v-model="model" top right class="text-capitalize">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn icon small dark v-bind="attrs" @click="model = false">
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
// decoradores
import { Component, Vue, Prop, Model } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  @Model("input", { type: Boolean }) readonly value!: boolean;
  @Prop() readonly text!: string;
  @Prop() readonly color!: string;

  get model() {
    return this.value;
  }

  set model(value) {
    this.$emit("input", value);
  }
}
</script>
