<template>
  <v-card color="rgba(0, 0, 0, 0.5)" dark>
    <v-container>
      <v-row class="pa-2">
        <v-col cols="100%" class="text-h6 text-uppercase">
          iniciar sesion
        </v-col>
      </v-row>
      <v-row dense class="text-capitalize">
        <v-col cols="12">
          <v-text-field
            label="nombre usuario"
            v-model="nombre"
            outlined
            hide-details="auto"
            :error-messages="nombreError"
            @input="$v.nombre.$touch()"
            @blur="$v.nombre.$touch()"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            label="password"
            v-model="password"
            type="password"
            counter=""
            outlined
            hide-details="auto"
            :error-messages="passwordError"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-btn large block color="blue" dark elevation="0" @click="login"
            >login</v-btn
          >
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
          <v-btn x-small plain color="white">nueva cuenta</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    nombre: { required },
    password: { required },
  },
})
export default class FormularioLogin extends Vue {
  nombre = "";
  password = "";

  get nombreError() {
    const errors: Array<string> = [];
    if (!this.$v.nombre.$dirty) return errors;
    if (!this.$v.nombre.required) errors.push("Requerido");
    return errors;
  }

  get passwordError() {
    const errors: Array<string> = [];
    if (!this.$v.password.$dirty) return errors;
    if (!this.$v.password.required) errors.push("Requerido");
    return errors;
  }

  login() {
    this.$v.$touch(); //el $v es el validador
    if (this.$v.$invalid) {
      //el invalid es una variable del validator que indica el estado del formulario
      return;
    }
    this.$emit("click-login", { nombre: this.nombre, password: this.password });
  }
}
</script>
