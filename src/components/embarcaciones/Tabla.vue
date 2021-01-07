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
    { text: "rut", value: "rut" },
    { text: "nombre", value: "nombre" },
    { text: "tipo", value: "tipo" },
    { text: "telefono", value: "telefono" },
    { text: "opciones", value: "action" },
  ];

  get itemsMap() {
    return this.items.map((item) => {
      let rut = "";
      let telefono = "";
      let nombre = item.nombre;
      switch (item.tipo) {
        case "cliente":
          rut = item.cliente?.rut.toString() ?? "";
          nombre = item.cliente?.nombre ?? nombre;
          telefono = item.cliente?.telefono.toString() ?? "";
          break;
        case "asistente":
          rut = item.asistente?.rut.toString() ?? "";
          nombre = item.asistente?.nombre ?? nombre;
          telefono = item.asistente?.telefono.toString() ?? "";
          break;
        default:
          break;
      }
      return {
        item: item,
        rut,
        nombre,
        tipo: item.tipo,
        telefono,
      };
    });
  }
}
</script>
