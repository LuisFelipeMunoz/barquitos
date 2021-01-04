<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="(barco, index) in barcos"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card>
          <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
          ></v-img>
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" class="text-h6 text-capitalize">nombre</v-col>
              <v-col cols="12">descripcion</v-col>
            </v-row>
            <v-row align="center" justify="center" no-gutters>
              <v-col cols="100%">
                <v-rating dense></v-rating>
              </v-col>
              <v-col cols="auto" class="text-h6">$ 50</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="auto" class="pl-2 text-caption">5 encuestas</v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row class="pt-2" no-gutters>
              <v-col cols="12">
                <v-btn block color="success">arrendar</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Lista extends Vue {
  barcos = [
    "barco",
    "barco",
    "barco",
    "barco",
    "barco",
    "barco",
    "barco",
    "barco",
    "barco",
  ];
}
</script>
