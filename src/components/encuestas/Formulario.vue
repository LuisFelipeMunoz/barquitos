<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario encuesta
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-text-field
        v-model.number="valoracion"
        label="Valoración"
        hide-details="auto"
        v-mask="'#'"
        :error-messages="valoracionError"
        @input="$v.valoracion.$touch()"
        @blur="$v.valoracion.$touch()"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="comentario"
        label="comentario"
        hide-details="auto"
        :error-messages="comentarioError"
        @input="$v.comentario.$touch()"
        @blur="$v.comentario.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3">
      <v-select
        v-model="cliente"
        label="cliente"
        hide-details="auto"
        :items="clientes"
        return-object
        :error-messages="clienteError"
        @input="$v.cliente.$touch()"
        @blur="$v.cliente.$touch()"
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
import { Component, Vue, Prop } from "vue-property-decorator";
// tipos
import { Arriendo, Cliente } from "@/typings/store";
//vuelidate
import { required, minValue, maxValue } from "vuelidate/lib/validators";

@Component({
  validations: {
    valoracion: { required, minValue: minValue(0), maxValue: maxValue(5) },
    comentario: { required },
    cliente: { required },
    arriendo: { required },
  },
})
export default class FormularioUsuario extends Vue {
  @Prop() readonly arriendos!: Array<Arriendo>;
  @Prop() readonly clientes!: Array<Cliente>;

  valoracion = 0;
  comentario = "";
  cliente: Cliente | null | undefined = null;
  arriendo: Arriendo | null | undefined = null;

  get valoracionError() {
    const errors: Array<string> = [];
    if (!this.$v.valoracion.$dirty) return errors;
    if (!this.$v.valoracion.required) errors.push("Requerido");
    if (!this.$v.valoracion.minValue) errors.push("Valor minimo: 0");
    if (!this.$v.valoracion.maxValue) errors.push("Valor maximo: 5");
    return errors;
  }

  get comentarioError() {
    const errors: Array<string> = [];
    if (!this.$v.comentario.$dirty) return errors;
    if (!this.$v.comentario.required) errors.push("Requerido");
    return errors;
  }

  get clienteError() {
    const errors: Array<string> = [];
    if (!this.$v.cliente.$dirty) return errors;
    if (!this.$v.cliente.required) errors.push("Requerido");
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
