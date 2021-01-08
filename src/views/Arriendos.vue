<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo arriendo</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaArriendos :items="items"></TablaArriendos>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioArriendo v-if="dialogoFormulario"></FormularioArriendo>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Arriendo } from "@/typings/store";
// componentes
import TablaArriendos from "@/components/arriendos/Tabla.vue";
import FormularioArriendo from "@/components/arriendos/Formulario.vue";

@Component({
  components: {
    TablaArriendos,
    FormularioArriendo,
  },
})
export default class VistaArriendos extends Vue {
  dialogoFormulario = false;

  items: Array<Arriendo> = [];
}
</script>
