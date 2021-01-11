<template>
  <v-container>
    <v-row>
      <v-col cols="100%">
        <v-text-field
          v-model="message"
          outlined
          clearable
          label="Ingresa el Arriendo a buscar"
          type="text"
        >
        </v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn color="black" dark @click="abrirDialogoInfo">
          buscar
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoInfo" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          informacion del arriendo
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">id:</v-col>
            <v-col cols="12">asistente:</v-col>
            <v-col cols="12">embarcacion:</v-col>
            <v-col cols="12">cliente:</v-col>
            <v-col cols="12">lugar retiro:</v-col>
            <v-col cols="12">fecha retiro:</v-col>
            <v-col cols="12">hora retiro:</v-col>
            <v-col cols="12">lugar entrega:</v-col>
            <v-col cols="12">fecha entrega:</v-col>
            <v-col cols="12">hora entrega:</v-col>
            <v-col cols="12">precio arriendo:</v-col>
            <v-col cols="12">precio seguro:</v-col>
            <v-col cols="12">total:</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialogoInfo = false">
            confirmo recepcion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// componentes
import ListaEmbarcaciones from "@/components/embarcaciones/Lista.vue"; // @ is an alias to /src
import { Arriendos } from "@/typings/store";

@Component({
  components: {
    ListaEmbarcaciones,
  },
})
export default class ArriendosPendientes extends Vue {
  dialogoInfo = false;

  arriendos: Arriendos = {};

  abrirDialogoInfo() {
    this.dialogoInfo = true;
  }
}
</script>
