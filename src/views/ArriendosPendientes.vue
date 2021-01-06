<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListaEmbarcaciones
          :items="barcos"
          @click-item="abrirDialogoInfo"
        ></ListaEmbarcaciones>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// componentes
import ListaEmbarcaciones from "@/components/embarcaciones/Lista.vue"; // @ is an alias to /src

@Component({
  components: {
    ListaEmbarcaciones,
  },
})
export default class ArriendosPendientes extends Vue {
  dialogoInfo = false;

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

  abrirDialogoInfo() {
    this.dialogoInfo = true;
  }
}
</script>
