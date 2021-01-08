<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario Seguro
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="valorSeguro"
        label="Valor del Seguro"
        hide-details="auto"
        :error-messages="valorSeguroError"
        @input="$v.valorSeguro.$touch()"
        @blur="$v.valorSeguro.$touch()"
      ></v-text-field>
    </v-col>
        
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
    valorSeguro: { required },
  },
})
export default class FormularioUsuario extends Vue {
  
  valorSeguro= 0;

  get valorSeguroError() {
    const errors: Array<string> = [];
    if (!this.$v.valorSeguro.$dirty) return errors;
    if (!this.$v.valorSeguro.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
