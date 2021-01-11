<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo encuesta</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaEncuestas :items="items"></TablaEncuestas>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioEncuesta v-if="dialogoFormulario"></FormularioEncuesta>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Encuestas } from "@/typings/store";
// componentes
import TablaEncuestas from "@/components/usuarios/Tabla.vue";
import FormularioEncuesta from "@/components/usuarios/Formulario.vue";
import { mapActions } from "vuex";
@Component({
  methods: mapActions({
    allEncuestas: "encuestas/all",
    setEncuestas: "encuestas/set",
    deleteEncuestas: "encuestas/delete",
  }),
  components: {
    TablaEncuestas,
    FormularioEncuesta,
  },
})
export default class VistaEncuestas extends Vue {
  async created() {
    this.encuestas = await this.allEncuestas();
  }
  dialogoFormulario = false;

  encuestas: Encuestas = {};

  get items() {
    return Object.values(this.encuestas);
  }
}
</script>
