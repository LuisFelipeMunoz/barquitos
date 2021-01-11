<template>
  <v-card class="text-capitalize">
    <v-card-title>
      arriendo embarcacion
    </v-card-title>
    <v-card-text>
      <v-row dense class="pb-3">
        <v-col cols="12">
          retiro
        </v-col>
      </v-row>
      <v-row dense class="pb-3">
        <v-col cols="12">
          <v-select
            label="lugar"
            hide-details="auto"
            v-model="retiro.lugar"
            :items="lugaresRetiro"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            label="fecha"
            hide-details="auto"
            v-model="retiro.fecha"
            :items="fechasRetiro"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            label="hora"
            hide-details="auto"
            v-model="retiro.hora"
            :items="horasRetiro"
          ></v-select>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="pb-3">
        <v-row dense class="pb-3">
          <v-col cols="12">
            entrega
          </v-col>
        </v-row>
        <v-col cols="12"> lugar: {{ arriendoDisponible.entrega.lugar }} </v-col>
        <v-col cols="12"> fecha: {{ arriendoDisponible.entrega.fecha }} </v-col>
        <v-col cols="12"> hora: {{ arriendoDisponible.entrega.hora }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense>
        <v-col cols="12">
          <v-select label="medio de pago" hide-details="auto"></v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="success" @click="confirmar">confirmar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
// decoradores
import { Component, Prop, Vue } from "vue-property-decorator";
// tipos
import { ArriendosDisponibles } from "@/typings/store";

@Component
export default class FormularioArrendar extends Vue {
  @Prop() readonly arriendosDisponibles!: ArriendosDisponibles;

  retiro = {
    lugar: "",
    fecha: "",
    hora: "",
  };

  get items() {
    return Object.values(this.arriendosDisponibles);
  }

  get lugaresRetiro() {
    return this.items.map((item) => {
      return item.retiro.lugar;
    });
  }

  get fechasRetiro() {
    return this.items
      .filter((item) => {
        return item.retiro.lugar == this.retiro.lugar;
      })
      .map((item) => {
        return item.retiro.fecha;
      });
  }

  get horasRetiro() {
    return this.items
      .filter((item) => {
        return (
          item.retiro.lugar == this.retiro.lugar &&
          item.retiro.fecha == this.retiro.fecha
        );
      })
      .map((item) => {
        return item.retiro.hora;
      });
  }

  get arriendoDisponible() {
    return this.items.filter((item) => {
      return (
        item.retiro.lugar == this.retiro.lugar &&
        item.retiro.fecha == this.retiro.fecha &&
        item.retiro.hora == this.retiro.hora
      );
    });
  }

  confirmar() {
    this.$emit("click-confirmar", this.arriendoDisponible);
  }
}
</script>
