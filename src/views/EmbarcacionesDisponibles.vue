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
        :arriendosDisponibles="arriendosDisponibles"
        @click-confirmar="guardarArriendo"
      ></FormularioArrendar>
    </v-dialog>
    <v-dialog v-model="dialogoComprobante" max-width="600" persistent>
      <DescargarComprobanteArriendo
        :arriendo="arriendo"
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
import { mapActions, mapState } from "vuex";
import {
  Arriendo,
  ArriendoDisponible,
  ArriendosDisponibles,
  Embarcacion,
  Embarcaciones,
} from "@/typings/store";
import { State } from "@/store";

@Component({
  computed: mapState({
    usuarioLogin: (val) => {
      const state = val as State;
      return state.usuario;
    },
  }),
  methods: mapActions({
    arriendosDisponiblesEmbarcaciones: "embarcaciones/arriendosDisponibles",
    listaEmbarcacionArriendosDisponibles:
      "arriendosDisponibles/listaEmbarcacion",
    crearPagoArriendo: "pagos/setArriendo",
    setArriendo: "arriendos/set",
    getArriendo: "arriendos/get",
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

  arriendosDisponibles: ArriendosDisponibles = {};
  arriendo: Arriendo | null = null;

  get items() {
    console.log(this.embarcaciones);
    return this.embarcaciones ? Object.values(this.embarcaciones) : [];
    //es un if, la primera parte es la condicion.
  }

  async abrirDialogoArrendar(data: Embarcacion) {
    console.log(data);
    const resultado = await this.listaEmbarcacionArriendosDisponibles(data);
    this.embarcacion = data;
    this.arriendosDisponibles = resultado;
    this.dialogoArrendar = true;
    console.log(resultado);
  }

  async guardarArriendo(data: {
    arriendoDisponible: ArriendoDisponible;
    medioPago: string;
  }) {
    if (!this.embarcacion || !this.usuarioLogin?.cliente) {
      console.log("error", this.embarcacion, this.usuarioLogin, data);
      return;
    }
    console.log("crearPagoArriendo");
    const idPago = await this.crearPagoArriendo({
      idEmbarcacion: this.embarcacion.id,
      tipo: data.medioPago,
    });
    console.log(idPago);

    const respuesta = await this.setArriendo({
      idCliente: this.usuarioLogin.cliente.rut,
      idEmbarcacion: parseInt(this.embarcacion.id),
      idArriendoDisponible: data.arriendoDisponible.id,
      idPago: parseInt(idPago),
    });
    console.log(respuesta);
    this.embarcaciones = await this.arriendosDisponiblesEmbarcaciones();
    const arriendos = await this.getArriendo(respuesta);
    const temp = Object.values(arriendos);
    if (temp.length > 0) {
      this.arriendo = temp[0];
    }
    this.dialogoArrendar = false;
    this.dialogoComprobante = true;
  }

  descargarComprobante() {
    this.dialogoComprobante = false;
  }
}
</script>
