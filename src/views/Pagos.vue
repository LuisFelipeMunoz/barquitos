<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo pago</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaPagos :items="items"></TablaPagos>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioPago v-if="dialogoFormulario"></FormularioPago>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Pagos } from "@/typings/store";
// componentes
import TablaPagos from "@/components/pagos/Tabla.vue";
import FormularioPago from "@/components/pagos/Formulario.vue";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allPagos: "pagos/all",
    setPagos: "pagos/set",
  }),
  components: {
    TablaPagos,
    FormularioPago,
  },
})
export default class VistaPagos extends Vue {
  async created() {
    this.pagos = await this.allPagos();
  }

  dialogoFormulario = false;
  pagos: Pagos = {};

  get items() {
      return Object.values(this.pagos);
  }
}
</script>
