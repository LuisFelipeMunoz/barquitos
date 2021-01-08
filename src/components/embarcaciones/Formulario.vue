<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario Embarcación
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="tipoEmbarcacion"
        label="Tipo de Embarcación"
        hide-details="auto"
        :error-messages="tipoEmbarcacionError"
        @input="$v.tipoEmbarcacion.$touch()"
        @blur="$v.tipoEmbarcacion.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="precio"
        label="Precio"
        hide-details="auto"
        :error-messages="precioError"
        @input="$v.precio.$touch()"
        @blur="$v.precio.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3">
        <v-text-field
          v-model="patente"
          :error-messages="patenteError"
          label="Patente"
          hide-details="auto"
          @input="$v.patente.$touch()"
          @blur="$v.patente.$touch()"
        ></v-text-field>

    <v-col cols="12" class="py-2">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12">
      <v-btn color="success" large block elevation="2" @click="guardar"
        >guardar</v-btn
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
//vuelidate
import { required, minLength } from "vuelidate/lib/validators";

@Component({
  validations: {
    tipoEmbarcacion: { required },
    precio: { required },
    patente: { required },

  },
})
export default class FormularioUsuario extends Vue {
  
  tipoEmbarcacion= "";
  precio= 0;
  patente= "";


  get tipoEmbarcacionError() {
    const errors: Array<string> = [];
    if (!this.$v.tipoEmbarcacion.$dirty) return errors;
    if (!this.$v.tipoEmbarcacion.required) errors.push("Requerido");
    return errors;
  }

  get precioError() {
    const errors: Array<string> = [];
    if (!this.$v.precio.$dirty) return errors;
    if (!this.$v.precio.required) errors.push("Requerido");
    return errors;
  }

  get patenteError() {
    const errors: Array<string> = [];
    if (!this.$v.Patente.$dirty) return errors;
    if (!this.$v.Patente.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
