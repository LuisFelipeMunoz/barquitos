<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ListaEmbarcaciones
          :items="items"
          @click-item="abrirDialogoArrendar"
        ></ListaEmbarcaciones>
      </v-col>
    </v-row>
    <!-- Dialogos -->
    <v-dialog v-model="dialogoArrendar" max-width="600">
      <FormularioArrendar
        @click-confirmar="guardarArriendo"
      ></FormularioArrendar>
    </v-dialog>
    <v-dialog v-model="dialogoComprobante" max-width="600" persistent>
      <DescargarComprobanteArriendo
        @click-descargar="descargarComprobante"
      ></DescargarComprobanteArriendo>
    </v-dialog>

    <!------------------------------------------------------->
    <!-- MENU -->
    <!------------------------------------------------------->

    <!-- <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          block
          elevation="2"
          color="success"
          dark
          v-bind="attrs"
          v-on="on"
        >
          ENCUESTA
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
                Responder
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline grey lighten-2">
                ENCUESTA
              </v-card-title>

              <v-card-text>
                CALIFICA DE 1 A 5 NUESTRO SERVICIO :
                <v-rating
                  v-model="rating"
                  background-color="indigo lighten-3"
                  color="indigo"
                  size="64"
                ></v-rating>
              </v-card-text>
              <v-card-text>
                HAZ UN COMENTARIO RESPECTO A TU EXPERENCIA :
                <v-container fluid>
                  <v-textarea
                    autocomplete="email"
                    label="Ingresalo aqui"
                  ></v-textarea>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  Enviar Encuesta
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-menu> -->
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// componentes
import ListaEmbarcaciones from "@/components/embarcaciones/Lista.vue"; // @ is an alias to /src
import FormularioArrendar from "@/components/arriendos/FormularioArrendar.vue";
import DescargarComprobanteArriendo from "@/components/arriendos/DescargarComprobante.vue";
import { mapActions } from "vuex";
import { Embarcacion, Embarcaciones } from "@/typings/store";

@Component({
  methods: mapActions({
    arriendosDisponiblesEmbarcaciones: "embarcaciones/arriendoDisponibles",
  }),
  components: {
    ListaEmbarcaciones,
    FormularioArrendar,
    DescargarComprobanteArriendo,
  },
})
export default class EmbarcacionesDisponibles extends Vue {
  async created() {
    this.embarcaciones = await this.arriendosDisponiblesEmbarcaciones();
  }
  dialogoArrendar = false;
  dialogoComprobante = false;

  embarcaciones: Embarcaciones = {};

  embarcacion: Embarcacion | null | undefined = null;

  get items() {
    return Object.values(this.embarcaciones);
  }

  abrirDialogoArrendar(data: Embarcacion) {
    this.embarcacion = data;
    this.dialogoArrendar = true;
  }

  guardarArriendo() {
    this.dialogoArrendar = false;

    this.dialogoComprobante = true;
  }

  descargarComprobante() {
    this.dialogoComprobante = false;
  }
}
</script>
