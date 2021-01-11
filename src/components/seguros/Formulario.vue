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
        v-model="valor"
        label="Valor del Seguro"
        hide-details="auto"
        :error-messages="valorError"
        @input="$v.valor.$touch()"
        @blur="$v.valor.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="embarcacion"
        label="embarcacion"
        hide-details="auto"
        :error-messages="embarcacionError"
        :items="embarcaciones"
        return-object
        @input="$v.embarcacion.$touch()"
        @blur="$v.embarcacion.$touch()"
      ></v-select>
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
// tipos
import { Embarcacion } from "@/typings/store";
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    valor: { required },
    embarcacion: { required },
  },
})
export default class FormularioSeguro extends Vue {
  valor = "";
  embarcacion: Embarcacion | null | undefined = null;

  get valorError() {
    const errors: Array<string> = [];
    if (!this.$v.valor.$dirty) return errors;
    if (!this.$v.valor.required) errors.push("Requerido");
    return errors;
  }

  get embarcacionError() {
    const errors: Array<string> = [];
    if (!this.$v.embarcacion.$dirty) return errors;
    if (!this.$v.embarcacion.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
