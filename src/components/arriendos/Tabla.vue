<template>
  <v-data-table
    :headers="headers"
    :items="itemsMap"
    :items-per-page="-1"
    hide-default-footer
    class="text-capitalize"
  >
    <template v-slot:item.action="{ item }">
      <v-row no-gutters>
        <v-col cols="auto" class="px-1">
          <v-btn x-small icon @click="$emit('click-edit', item)">
            <v-icon small>mdi-account-edit</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="auto" class="px-1">
          <v-btn x-small icon @click="$emit('click-remove', item)">
            <v-icon small>mdi-account-remove</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-data-table>
</template>

<script lang="ts">
// decoradores
import { Component, Vue, Prop } from "vue-property-decorator";
// tipos
import { Arriendo } from "@/typings/store";

@Component
export default class TablaArriendos extends Vue {
  @Prop() readonly items!: Array<Arriendo>;

  headers = [
    { text: "id", value: "id" },
    { text: "embarcacion", value: "embarcacion" },
    { text: "cliente", value: "cliente" },
    { text: "valor", value: "valor" },
    { text: "estado", value: "estado" },
  ];

  get itemsMap() {
    return this.items.map((item) => {
      const id = item.id;
      const embarcacion = item.embarcacion;
      const cliente = item.cliente;
      const valor = item.valor;
      const estado = item.estado;
      return {
        item: item,
        id,
        embarcacion,
        cliente,
        valor,
        estado
      };
    });
  }
}
</script>
