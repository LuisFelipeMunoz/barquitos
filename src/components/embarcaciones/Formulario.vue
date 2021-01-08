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
        v-model="tipo"
        label="Tipo de Embarcación"
        hide-details="auto"
        :error-messages="tipoError"
        @input="$v.tipo.$touch()"
        @blur="$v.tipo.$touch()"
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
// decoradores
import { Component, Vue } from "vue-property-decorator";
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    tipo: { required },
    precio: { required },
    patente: { required },
  },
})
export default class FormularioUsuario extends Vue {
  tipo = "";
  precio = 0;
  patente = "";


  get tipoError() {
    const errors: Array<string> = [];
    if (!this.$v.tipo.$dirty) return errors;
    if (!this.$v.tipo.required) errors.push("Requerido");
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
