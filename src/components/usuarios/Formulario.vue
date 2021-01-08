<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario usuario
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="nombreUsuario"
        label="nombre usuario"
        v-mask="'XXXXXXXXXXXX'"
        hide-details="auto"
        :error-messages="nombreUsuarioError"
        @input="$v.nombreUsuario.$touch()"
        @blur="$v.nombreUsuario.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model="password"
        label="contraseña"
        hide-details="auto"
        type="password"
        counter
        :error-messages="passwordError"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="tipo"
        label="tipo"
        hide-details="auto"
        :error-messages="tipoError"
        :items="tipos"
        @input="$v.tipo.$touch()"
        @blur="$v.tipo.$touch()"
      ></v-select>
    </v-col>
    <template v-if="tipo == 'cliente' || tipo == 'asistente'">
      <v-col cols="12" class="py-2">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" class="px-3">
        <v-text-field
          v-model.number="rut"
          :error-messages="rutError"
          v-mask="'########'"
          label="rut"
          hide-details="auto"
          @input="$v.rut.$touch()"
          @blur="$v.rut.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-3">
        <v-text-field
          v-model="nombre"
          label="nombre usuario"
          hide-details="auto"
          :error-messages="nombreError"
          @input="$v.nombre.$touch()"
          @blur="$v.nombre.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-3">
        <v-text-field
          v-model="direccion"
          :error-messages="direccionError"
          label="direccion"
          hide-details="auto"
          @input="$v.direccion.$touch()"
          @blur="$v.direccion.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="px-3">
        <v-text-field
          v-model.number="telefono"
          :error-messages="telefonoError"
          v-mask="'#########'"
          label="telefono"
          hide-details="auto"
          @input="$v.telefono.$touch()"
          @blur="$v.telefono.$touch()"
        ></v-text-field>
      </v-col>
    </template>
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
import { required, minLength } from "vuelidate/lib/validators";

@Component({
  validations: {
    nombreUsuario: { required },
    password: { required, minLength: minLength(8) },
    tipo: { required },
    rut: { required },
    nombre: { required },
    direccion: { required },
    telefono: { required },
  },
})
export default class FormularioUsuario extends Vue {
  nombreUsuario = "";
  password = "";
  tipo = "";
  rut = 0;
  nombre = "";
  direccion = "";
  telefono = 0;

  tipos = ["administrador", "cliente", "asistente"];

  get nombreUsuarioError() {
    const errors: Array<string> = [];
    if (!this.$v.nombreUsuario.$dirty) return errors;
    if (!this.$v.nombreUsuario.required) errors.push("Requerido");
    return errors;
  }

  get passwordError() {
    const errors: Array<string> = [];
    if (!this.$v.password.$dirty) return errors;
    if (!this.$v.password.required) errors.push("Requerido");
    if (!this.$v.password.minLength) errors.push("Minimo 8 caracteres");
    return errors;
  }

  get tipoError() {
    const errors: Array<string> = [];
    if (!this.$v.tipo.$dirty) return errors;
    if (!this.$v.tipo.required) errors.push("Requerido");
    return errors;
  }

  get rutError() {
    const errors: Array<string> = [];
    if (!this.$v.rut.$dirty) return errors;
    if (!this.$v.rut.required) errors.push("Requerido");
    return errors;
  }

  get nombreError() {
    const errors: Array<string> = [];
    if (!this.$v.nombre.$dirty) return errors;
    if (!this.$v.nombre.required) errors.push("Requerido");
    return errors;
  }

  get direccionError() {
    const errors: Array<string> = [];
    if (!this.$v.direccion.$dirty) return errors;
    if (!this.$v.direccion.required) errors.push("Requerido");
    return errors;
  }

  get telefonoError() {
    const errors: Array<string> = [];
    if (!this.$v.telefono.$dirty) return errors;
    if (!this.$v.telefono.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
