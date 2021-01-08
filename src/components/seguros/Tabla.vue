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
import { Usuario } from "@/typings/store";

@Component
export default class TablaUsuarios extends Vue {
  @Prop() readonly items!: Array<Usuario>;

  headers = [
    { text: "valorSeguro", value: "valorSeguro" },
  ];

  get itemsMap() {
    return this.items.map((item) => {
      let valorSeguro = "";
      let precio = "";
      let patente = "";
      
      valorSeguro = item.seguro?.valorSeguro.toString() ?? "";
      }
      return {
        valorSeguro,
      };
    });
  }
}
</script>
