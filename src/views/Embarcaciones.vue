<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo embarcacion</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaEmbarcaciones :items="items"></TablaEmbarcaciones>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioEmbarcacion
            v-if="dialogoFormulario"
          ></FormularioEmbarcacion>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Embarcaciones } from "@/typings/store";
// componentes
import TablaEmbarcaciones from "@/components/embarcaciones/Tabla.vue";
import FormularioEmbarcacion from "@/components/embarcaciones/Formulario.vue";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allEmbarcaciones: "embarcaciones/all",
    setEmbarcaciones: "embarcaciones/set",
  }),
  components: {
    TablaEmbarcaciones,
    FormularioEmbarcacion,
  },
})
export default class VistaEmbarcaciones extends Vue {
  async created() {
    this.embarcaciones = await this.allEmbarcaciones();
  }

  dialogoFormulario = false;

  embarcaciones: Embarcaciones = {};

  get items() {
    return Object.values(this.embarcaciones);
  }
}
</script>
