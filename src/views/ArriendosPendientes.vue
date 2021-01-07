<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
            v-model="message"
            outlined
            clearable
            label="Ingresa el Arriendo a buscar"
            type="text"
          >
          </v-text-field>
 
    
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        
        <v-btn block
          color="black"
          dark
          v-bind="attrs"
          v-on="on"
        >
          BUSCAR
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          INFORMACIÓN DEL ARRIENDO
        </v-card-title>
        
        <v-row dense>
          <v-card-text>
            
            <v-col cols="12">ID_ARRIENDO:</v-col>
            <v-col cols="12">ID_ASISTENTE:</v-col>
            <v-col cols="12">ID_EMBARCACION:</v-col>
            <v-col cols="12">RUT:</v-col>
            <v-col cols="12">ID_SEGURO:</v-col>
            <v-col cols="12">LUGAR_RETIRO:</v-col>
            <v-col cols="12">LUGAR_ENTREGA:</v-col>
            <v-col cols="12">HORA_RETIRO:</v-col>
            <v-col cols="12">HORA_ENTREG:</v-col>
            <v-col cols="12">FECHA_RETIRO:</v-col>
            <v-col cols="12">FECHA_ENTREGA:</v-col>
            <v-col cols="12">VALOR:</v-col>
      
          </v-card-text>
        </v-row>

        

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            CONFIRMO RECEPCIÓN
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
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
