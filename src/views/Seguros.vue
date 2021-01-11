<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo seguro</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaSeguros :items="items"></TablaSeguros>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioSeguros v-if="dialogoFormulario"></FormularioSeguros>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Seguros } from "@/typings/store";
// componentes
import TablaSeguros from "@/components/seguros/Tabla.vue";
import FormularioSeguros from "@/components/seguros/Formulario.vue";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allSeguros: "seguros/all",
    setSeguros: "seguros/set",
  }),
  components: {
    TablaSeguros,
    FormularioSeguros,
  },
})
export default class VistaSeguros extends Vue {
  async created() {
    this.seguros = await this.allSeguros();
  }
  dialogoFormulario = false;

  seguros: Seguros = {};

  get items() {
    return Object.values(this.seguros);
  }
}
</script>
