<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario arriendo disponible
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model.number="id"
        :error-messages="idError"
        label="id arriendo"
        hide-details="auto"
        @input="$v.id.$touch()"
        @blur="$v.id.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="embarcacion"
        label="embarcacion"
        hide-details="auto"
        :error-messages="embarcacionError"
        :items="embarcacion"
        return-object
        @input="$v.embarcacion.$touch()"
        @blur="$v.embarcacion.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="lugarRetiro"
        :error-messages="lugarRetiroError"
        label="lugar retiro"
        hide-details="auto"
        @input="$v.lugarRetiro.$touch()"
        @blur="$v.lugarRetiro.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="lugarEntrada"
        :error-messages="lugarEntradaError"
        label="lugar entrada"
        hide-details="auto"
        @input="$v.lugarEntrada.$touch()"
        @blur="$v.lugarEntrada.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="fechaRetiro"
        :error-messages="fechaRetiroError"
        label="fecha retito"
        hide-details="auto"
        @input="$v.fechaRetiro.$touch()"
        @blur="$v.fechaRetiro.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="fechaEntrada"
        :error-messages="fechaEntradaError"
        label="fecha entrada"
        hide-details="auto"
        @input="$v.fechaEntrada.$touch()"
        @blur="$v.fechaEntrada.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="horaRetiro"
        :error-messages="horaRetiroError"
        label="hora retiro"
        hide-details="auto"
        @input="$v.horaRetiro.$touch()"
        @blur="$v.horaRetiro.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="horaEntrada"
        :error-messages="horaEntradaError"
        label="hora entrada"
        hide-details="auto"
        @input="$v.horaEntrada.$touch()"
        @blur="$v.horaEntrada.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="py-2">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12">
      <v-btn color="success" large block elevation="2" @click="guardar">
        guardar
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
//siempre reciben cosas y envian cosas, no leen directamente nada, tienen eventos
// decoradores
import { Component, Vue, Prop } from "vue-property-decorator";
// tipos
import { Embarcacion } from "@/typings/store";
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    id: { required },
    embarcacion: { required }, 
    lugarRetiro: { required },
    lugarEntrada: { required },
    fechaRetiro: { required },
    fechaEntrada: { required },
    horaRetiro: { required },
    horaEntrada: { required },
  },
})
export default class FormularioArriendoDisponible extends Vue {
  @Prop() readonly embarcaciones!: Array<Embarcacion>;

  id = 0;
  embarcacion: Embarcacion | null | undefined = null;
  lugarRetiro = "";
  lugarEntrada = "";
  fechaRetiro = "";
  fechaEntrada = "";
  horaRetiro = "";
  horaEntrada = "";

  get idError() {
    const errors: Array<string> = [];
    if (!this.$v.id.$dirty) return errors;
    if (!this.$v.id.required) errors.push("Requerido");
    return errors;
  }

  get embarcacionError() {
    const errors: Array<string> = [];
    if (!this.$v.embarcacion.$dirty) return errors;
    if (!this.$v.embarcacion.required) errors.push("Requerido");
    return errors;
  }

  get lugarRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.lugarRetiro.$dirty) return errors;
    if (!this.$v.lugarRetiro.required) errors.push("Requerido");
    return errors;
  }

  get lugarEntradaError() {
    const errors: Array<string> = [];
    if (!this.$v.lugarEntrada.$dirty) return errors;
    if (!this.$v.lugarEntrada.required) errors.push("Requerido");
    return errors;
  }

  get fechaRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.fechaRetiro.$dirty) return errors;
    if (!this.$v.fechaRetiro.required) errors.push("Requerido");
    return errors;
  }

  get fechaEntradaError() {
    const errors: Array<string> = [];
    if (!this.$v.fechaEntrada.$dirty) return errors;
    if (!this.$v.fechaEntrada.required) errors.push("Requerido");
    return errors;
  }

  get horaRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.horaRetiro.$dirty) return errors;
    if (!this.$v.horaRetiro.required) errors.push("Requerido");
    return errors;
  }

  get horaEntradaError() {
    const errors: Array<string> = [];
    if (!this.$v.horaEntrada.$dirty) return errors;
    if (!this.$v.horaEntrada.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
    this.$emit("click-guardar", "la caro estuvo aqui"); //emite un evento hacia el padre (vistas)
    }
}
</script>
