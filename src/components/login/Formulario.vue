<template>
  <v-card color="rgba(0, 0, 0, 0.5)" dark>
    <v-container>
      <v-row class="pa-2">
        <v-col cols="100%" class="text-h6 text-uppercase">
          iniciar sesion
        </v-col>
        <v-col cols="auto">
          <v-btn small icon>
            <v-icon small color="grey">mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row dense class="text-capitalize">
        <v-col cols="12">
          <v-text-field
            label="nombre usuario"
            v-model="nombre"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="password"
            outlined
            hide-details="auto"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn large block color="blue" dark elevation="0" @click="login"
            >login</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn x-small plain color="white">nueva cuenta</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FormularioLogin extends Vue {
  nombre = "";

  login() {
    this.$emit("click-login", this.nombre);
  }
}
</script>
