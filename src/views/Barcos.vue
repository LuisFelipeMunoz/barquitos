<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListaEmbarcaciones
          :items="barcos"
          @click-item="abrirDialogoArrendar"
        ></ListaEmbarcaciones>
      </v-col>
    </v-row>
    <!-- Dialogos -->
    <v-dialog v-model="dialogoArrendar" max-width="600">
      <FormularioArriendo
        @click-confirmar="guardarArriendo"
      ></FormularioArriendo>
    </v-dialog>
    <v-dialog v-model="dialogoComprobante" max-width="600" persistent>
      <DescargarComprobanteArriendo
        @click-descargar="descargarComprobante"
      ></DescargarComprobanteArriendo>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// componentes
import ListaEmbarcaciones from "@/components/embarcaciones/Lista.vue"; // @ is an alias to /src
import FormularioArriendo from "@/components/arriendos/Formulario.vue";
import DescargarComprobanteArriendo from "@/components/arriendos/DescargarComprobante.vue";

@Component({
  components: {
    ListaEmbarcaciones,
    FormularioArriendo,
    DescargarComprobanteArriendo,
  },
})
export default class Barcos extends Vue {
  dialogoArrendar = false;
  dialogoComprobante = false;

  barcos = ["barco", "barco", "barco", "barco"];

  abrirDialogoArrendar() {
    this.dialogoArrendar = true;
  }

  guardarArriendo() {
    this.dialogoArrendar = false;
    this.dialogoComprobante = true;
  }

  descargarComprobante() {
    this.dialogoComprobante = false;
  }
}
</script>
