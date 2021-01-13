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
            v-model="lugarRetiro"
            :items="lugaresRetiro"
            :error-messages="lugarRetiroError"
            @input="$v.lugarRetiro.$touch()"
            @blur="$v.lugarRetiro.$touch()"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            label="fecha"
            hide-details="auto"
            v-model="fechaRetiro"
            :items="fechasRetiro"
            :error-messages="fechaRetiroError"
            @input="$v.fechaRetiro.$touch()"
            @blur="$v.fechaRetiro.$touch()"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            label="hora"
            hide-details="auto"
            v-model="horaRetiro"
            :items="horasRetiro"
            :error-messages="horaRetiroError"
            @input="$v.horaRetiro.$touch()"
            @blur="$v.horaRetiro.$touch()"
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
        <v-col cols="12"> lugar: {{ lugarEntrega }} </v-col>
        <v-col cols="12"> fecha: {{ fechaEntrega }} </v-col>
        <v-col cols="12"> hora: {{ horaEntrega }} </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense>
        <v-col cols="12">
          <v-select
            label="medio de pago"
            hide-details="auto"
            v-model="medioPago"
            :items="mediosPago"
            :error-messages="medioPagoError"
            @input="$v.medioPago.$touch()"
            @blur="$v.medioPago.$touch()"
          ></v-select>
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
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    lugarRetiro: { required },
    fechaRetiro: { required },
    horaRetiro: { required },
    medioPago: { required },
  },
})
export default class FormularioArrendar extends Vue {
  @Prop() readonly arriendosDisponibles!: ArriendosDisponibles;

  lugarRetiro = "";
  fechaRetiro = "";
  horaRetiro = "";

  medioPago = "";
  mediosPago = ["debito", "credito"];

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
        return item.retiro.lugar == this.lugarRetiro;
      })
      .map((item) => {
        return item.retiro.fecha;
      });
  }

  get horasRetiro() {
    return this.items
      .filter((item) => {
        return (
          item.retiro.lugar == this.lugarRetiro &&
          item.retiro.fecha == this.fechaRetiro
        );
      })
      .map((item) => {
        return item.retiro.hora;
      });
  }

  get arriendoDisponible() {
    return this.items.find((item) => {
      return (
        item.retiro.lugar == this.lugarRetiro &&
        item.retiro.fecha == this.fechaRetiro &&
        item.retiro.hora == this.horaRetiro
      );
    });
  }

  get lugarEntrega() {
    return this.arriendoDisponible?.entrega.lugar ?? "Seleccione lugar";
  }

  get fechaEntrega() {
    return this.arriendoDisponible?.entrega.fecha ?? "Seleccione fecha";
  }

  get horaEntrega() {
    return this.arriendoDisponible?.entrega.hora ?? "Seleccione hora";
  }

  get lugarRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.lugarRetiro.$dirty) return errors;
    if (!this.$v.lugarRetiro.required) errors.push("Requerido");
    return errors;
  }

  get fechaRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.fechaRetiro.$dirty) return errors;
    if (!this.$v.fechaRetiro.required) errors.push("Requerido");
    return errors;
  }

  get horaRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.horaRetiro.$dirty) return errors;
    if (!this.$v.horaRetiro.required) errors.push("Requerido");
    return errors;
  }

  get medioPagoError() {
    const errors: Array<string> = [];
    if (!this.$v.medioPago.$dirty) return errors;
    if (!this.$v.medioPago.required) errors.push("Requerido");
    return errors;
  }

  confirmar() {
    this.$v.$touch(); //el $v es el validador
    if (this.$v.$invalid) {
      //el invalid es una variable del validator que indica el estado del formulario
      return;
    }
    this.$emit("click-confirmar", this.arriendoDisponible);
  }
}
</script>
