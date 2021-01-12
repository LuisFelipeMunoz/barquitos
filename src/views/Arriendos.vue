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
//las vistas son componentes estructurales, usualmente no tienen muchas lineas porque llaman los COMPONENTS
//las vistas son para acomodar componentes, y estas son los que se comunican con el store, le mandan los dantos a los COMPONENTs y 
//reciben los eventos que le mandan los COMPONENTS. 
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Arriendos } from "@/typings/store";
// componentes
import TablaArriendos from "@/components/arriendos/Tabla.vue";
import FormularioArriendo from "@/components/arriendos/Formulario.vue";
import { mapActions } from "vuex"; //con esta se comunica al store
//se puede mapear los getter, los mutations, ect, pero idealmente solo se deben mapear los getters y los actions
//los getter no pueden ser asincrono

//en nuestro caso estamos obligados a usar solo actions porque utilizamos la funcion fetch para comunicarnos
//con la api porque es una funcion asincrona.

@Component({
  methods: mapActions({
    allArriendos: "arriendos/all", 
    setArriendos: "arriendos/set",
  }),
  components: {
    TablaArriendos,
    FormularioArriendo,
  },
})
export default class VistaArriendos extends Vue {
  //hooks son funciones que se ejecutan en momentos especificos del ciclo de vida del COMPONENTE
  //existen varios hooks como created mounted (cuando la parte visual ya se cargo por completo) destroyed (cuando se finaliza el componente)
  async created() { //a penas se carga el componente
    this.arriendos = await this.allArriendos();
  }
  dialogoFormulario = false;

  arriendos: Arriendos = {};

  get items() {
    return Object.values(this.arriendos);
  }
}
</script>



