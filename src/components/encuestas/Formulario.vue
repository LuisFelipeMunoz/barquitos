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
        v-model="valoracion"
        label="Valoración"
        hide-details="auto"
        :error-messages="valoracionError"
        @input="$v.valoracion.$touch()"
        @blur="$v.valoracion.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="comentario"
        label="comentario"
        hide-details="auto"
        :error-messages="comentarioError"
        @input="$v.comentario.$touch()"
        @blur="$v.comentario.$touch()"
      ></v-select>
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
    valoracion: { required },
    comentario: { required },

  },
})
export default class FormularioUsuario extends Vue {
  
  valoracion= "";
  comentario= "";

  get valoracionError() {
    const errors: Array<string> = [];
    if (!this.$v.valoracion.$dirty) return errors;
    if (!this.$v.valoracion.required) errors.push("Requerido");
    return errors;
  }

  get comentarioError() {
    const errors: Array<string> = [];
    if (!this.$v.comentario.$dirty) return errors;
    if (!this.$v.comentario.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
