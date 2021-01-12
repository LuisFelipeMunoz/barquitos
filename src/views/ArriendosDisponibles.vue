
<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo arriendo disponible</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaArriendosDisponibles :items="items"></TablaArriendosDisponibles>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioArriendoDisponible v-if="dialogoFormulario" @click-guardar="guardar"></FormularioArriendoDisponible>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script lang="ts">
// decoradores
import { ArriendosDisponibles } from "@/typings/store";
import { Component, Vue } from "vue-property-decorator";
// componentes
import TablaArriendoDisponibles from "@/components/arriendoDisponibles/Tabla.vue";
import FormularioArriendoDisponible from "@/components/arriendoDisponibles/Formulario.vue";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allArriendosDisponibles: "arriendoDisponibles/all",
    setArriendosDisponibles: "arriendoDisponibles/set",
  }),
  components: {
    TablaArriendoDisponibles,
    FormularioArriendoDisponible,
  },
})
export default class VistaArriendosDisponibles extends Vue {
  async created() {
  this.arriendosDisponibles = await this.allArriendosDisponibles();
  }
  dialogoFormulario = false;

  arriendosDisponibles: ArriendosDisponibles = {};

  get items() {
    return this.arriendosDisponibles? Object.values(this.arriendosDisponibles): []
  }

  guardar(data: string){
    console.log(data);
  }
}


</script>



