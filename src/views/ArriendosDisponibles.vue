<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        crud arriendos disponibles
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { ArriendosDisponibles } from "@/typings/store";
import { Component, Vue } from "vue-property-decorator";
// componentes
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allArriendosDisponibles: "arriendosDisponibles/all",
    setArriendosDisponibles: "arriendosDisponibles/set",
  }),
  components: {},
})
export default class VistaArriendosDisponibles extends Vue {
  async created() {
  this.arriendosDisponibles = await this.allArriendosDisponibles();
  }
  dialogoFormulario = false;

  arriendosDisponibles: ArriendosDisponibles = {};

  get items() {
    return Object.values(this.arriendosDisponibles);
  }
}
</script>



export default class VistaArriendos extends Vue {
  async created() {
    this.arriendos = await this.allArriendos();
  }
  dialogoFormulario = false;

  arriendos: Arriendos = {};

  get items() {
    return Object.values(this.arriendos);
  }
}
</script>
