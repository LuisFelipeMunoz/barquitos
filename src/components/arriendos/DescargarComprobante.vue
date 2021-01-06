<template>
  <v-card class="text-capitalize">
    <v-card-title>
      comprobante arriendo
    </v-card-title>
    <v-card-actions>
      <v-btn block color="success" @click="$emit('click-descargar')"
        >descargar</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DescargarComprobanteArriendo extends Vue {}
</script>
