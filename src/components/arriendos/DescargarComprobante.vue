<template>
  <v-card class="text-capitalize">
    <v-card-title>
      comprobante arriendo
    </v-card-title>
    <v-card-text>
      <v-row dense>
        <v-col cols="12"> Patente Embarcacion: {{ patente }} </v-col>
        <v-col cols="12"> Nombre cliente: {{ nombreCliente }} </v-col>
        <v-col cols="12"> Precio: {{ precio }} </v-col>
        <v-col cols="12"> lugar Retiro: {{ lugarRetiro }} </v-col>
        <v-col cols="12"> lugar Entrada: {{ lugarEntrada }} </v-col>
        <v-col cols="12"> Fecha Retiro: {{ fechaRetiro }} </v-col>
        <v-col cols="12"> Fecha Entrada: {{ fechaEntrada }} </v-col>
        <v-col cols="12"> Hora Retiro: {{ horaRetiro }} </v-col>
        <v-col cols="12"> Hora Entrada: {{ horaEntrada }} </v-col>
        <v-col cols="12"> Nombre Asistente: {{ nombreAsistente }} </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="success" @click="$emit('click-descargar')"
        >descargar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Arriendo } from "@/typings/store";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class DescargarComprobanteArriendo extends Vue {
  @Prop() readonly arriendo!: Arriendo;

  get patente() {
    return this.arriendo.embarcacion.patente;
  }
  get nombreCliente() {
    return this.arriendo.cliente.nombre;
  }
  get precio() {
    return this.arriendo.valor;
  }
  get lugarRetiro() {
    return this.arriendo.retiro.lugar;
  }
  get lugarEntrada() {
    return this.arriendo.entrada.lugar;
  }
  get fechaRetiro() {
    return this.arriendo.retiro.fecha;
  }
  get fechaEntrada() {
    return this.arriendo.entrada.fecha;
  }
  get horaRetiro() {
    return this.arriendo.retiro.hora;
  }
  get horaEntrada() {
    return this.arriendo.entrada.hora;
  }
  get nombreAsistente() {
    return this.arriendo.asistente.nombre;
  }
}
</script>
