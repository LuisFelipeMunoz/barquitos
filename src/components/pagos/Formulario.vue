<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario Pago
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="valor"
        label="valor"
        hide-details="auto"
        :error-messages="valorError"
        @input="$v.valor.$touch()"
        @blur="$v.valor.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="tipo"
        label="tipo"
        hide-details="auto"
        :items="tipos"
        :error-messages="tipoError"
        @input="$v.tipo.$touch()"
        @blur="$v.tipo.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="arriendo"
        label="arriendo"
        hide-details="auto"
        :items="arriendos"
        return-object
        :error-messages="arriendoError"
        @input="$v.arriendo.$touch()"
        @blur="$v.arriendo.$touch()"
      ></v-select>
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
import { Arriendo } from "@/typings/store";
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    valor: { required },
    tipo: { required },
    arriendo: { required },
  },
})
export default class FormularioPagos extends Vue {
  valor = "";
  tipo = "";
  arriendo: Arriendo | null | undefined = null;

  tipos = ["debito", "credito"];

  get valorError() {
    const errors: Array<string> = [];
    if (!this.$v.valor.$dirty) return errors;
    if (!this.$v.valor.required) errors.push("Requerido");
    return errors;
  }

  get tipoError() {
    const errors: Array<string> = [];
    if (!this.$v.tipo.$dirty) return errors;
    if (!this.$v.tipo.required) errors.push("Requerido");
    return errors;
  }

  get arriendoError() {
    const errors: Array<string> = [];
    if (!this.$v.arriendo.$dirty) return errors;
    if (!this.$v.arriendo.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
