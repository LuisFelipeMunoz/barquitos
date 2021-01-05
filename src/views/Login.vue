<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="10" md="6" lg="3">
        <v-card>
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
            <!-- <v-row justify="space-around">
              <v-col cols="auto">
                <v-btn fab color="black"></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn fab color="red"></v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn fab color="blue"></v-btn>
              </v-col>
            </v-row>
            <v-row align="center" justify="space-around" class="py-3">
              <v-col cols="3">
                <v-divider></v-divider>
              </v-col>
              <v-col cols="auto" class="text-h6">
                or
              </v-col>
              <v-col cols="3">
                <v-divider></v-divider>
              </v-col>
            </v-row> -->
            <v-row dense class="text-capitalize">
              <v-col cols="12">
                <v-text-field
                  label="nombre usuario"
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
                <v-btn
                  large
                  block
                  color="blue"
                  dark
                  elevation="0"
                  @click="login"
                  >login</v-btn
                >
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn x-small plain color="blue">nueva cuenta</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  login() {
    // codigo consulta api login
    console.log("login");
    //cambio de ruta
    this.$router.push({ name: "barcos" });
  }
}
</script>

<style scoped></style>
