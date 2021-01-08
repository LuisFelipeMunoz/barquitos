<template>
  <v-card class="text-capitalize">
    <v-card-title>
      arriendo embarcacion
    </v-card-title>
    <v-card-text>
      <v-row dense class="pb-3">
        <v-col cols="12">
          <v-select label="lugar" hide-details="auto"></v-select>
        </v-col>
        <v-col cols="12">
          <v-select label="fecha" hide-details="auto"></v-select>
        </v-col>
        <v-col cols="12">
          <v-select label="hora" hide-details="auto"></v-select>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense>
        <v-col cols="12">
          <v-select label="medio de pago" hide-details="auto"></v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="success" @click="confirmar">confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormularioArrendar extends Vue {
  confirmar() {
    this.$emit("click-confirmar");
  }
}
</script>
