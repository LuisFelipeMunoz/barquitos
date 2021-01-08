<template>
  <v-row dense class="text-capitalize">
    <v-col cols="12" class="pt-3 text-center text-uppercase title">
      formulario arriendo
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="cliente"
        label="cliente"
        hide-details="auto"
        :error-messages="clienteError"
        :items="clientes"
        return-object
        @input="$v.cliente.$touch()"
        @blur="$v.cliente.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
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
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="asistente"
        label="asistente"
        hide-details="auto"
        :error-messages="asistenteError"
        :items="asistente"
        return-object
        @input="$v.asistente.$touch()"
        @blur="$v.asistente.$touch()"
      ></v-select>
    </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="seguro"
        label="seguro"
        hide-details="auto"
        :error-messages="seguroError"
        :items="seguro"
        return-object
        @input="$v.seguro.$touch()"
        @blur="$v.seguro.$touch()"
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
      <v-col cols="12" class="px-3">
        <v-text-field
          v-model.number="valor"
          :error-messages="valorError"
          label="valor"
          hide-details="auto"
          @input="$v.valor.$touch()"
          @blur="$v.valor.$touch()"
        ></v-text-field>
      </v-col>
    <v-col cols="12" class="px-3 mb-3">
      <v-select
        v-model="estado"
        label="estado"
        hide-details="auto"
        :error-messages="estadoError"
        :items="estados"
        @input="$v.estado.$touch()"
        @blur="$v.estado.$touch()"
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
import { Asistente, Cliente, Embarcacion, Seguro } from "@/typings/store";
import { Component, Vue } from "vue-property-decorator";
//vuelidate
import { required } from "vuelidate/lib/validators";

@Component({
  validations: {
    asistente: { required }, //listo
    embarcacion: { required }, //listo
    cliente: { required }, //LISTO
    seguro: { required }, //listo 
    lugarRetiro: { required },
    lugarEntrada: { required },
    fechaRetiro: { required },
    fechaEntrada: { required },
    horaRetiro: { required },
    horaEntrada: { required },
    valor: { required },
    estado: { required },
  },
})
export default class FormularioArriendo extends Vue {
  asistente: Asistente | null | undefined = null;
  embarcacion: Embarcacion | null | undefined = null;
  cliente: Cliente | null | undefined = null;
  seguro: Seguro | null | undefined = null;
  lugarRetiro = "";
  lugarEntrada = "";
  fechaRetiro = "";
  fechaEntrada = "";
  horaRetiro = "";
  horaEntrada = "";
  valor = 0;
  estado = false;

  estados = ['pendiente', 'finalizado'];


  get clienteError() {
    const errors: Array<string> = [];
    if (!this.$v.cliente.$dirty) return errors;
    if (!this.$v.cliente.required) errors.push("Requerido");
    return errors;
  }

  get embarcacionError() {
    const errors: Array<string> = [];
    if (!this.$v.embarcacion.$dirty) return errors;
    if (!this.$v.embarcacion.required) errors.push("Requerido");
    return errors;
  }

  get asistenteError() {
    const errors: Array<string> = [];
    if (!this.$v.asistente.$dirty) return errors;
    if (!this.$v.asistente.required) errors.push("Requerido");
    return errors;
  }

  get seguroError() {
    const errors: Array<string> = [];
    if (!this.$v.seguro.$dirty) return errors;
    if (!this.$v.seguro.required) errors.push("Requerido");
    return errors;
  }

  get lugarRetiroError() {
    const errors: Array<string> = [];
    if (!this.$v.lugarRetiro.$dirty) return errors;
    if (!this.$v.lugarRetiro.required) errors.push("Requerido");
    return errors;
  }

  get LugarEntradaError() {
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

    get valorError() {
    const errors: Array<string> = [];
    if (!this.$v.valor.$dirty) return errors;
    if (!this.$v.valor.required) errors.push("Requerido");
    return errors;
  }

    get estadoError() {
    const errors: Array<string> = [];
    if (!this.$v.estado.$dirty) return errors;
    if (!this.$v.estado.required) errors.push("Requerido");
    return errors;
  }

  guardar() {
    this.$v.$touch();
  }
}
</script>
