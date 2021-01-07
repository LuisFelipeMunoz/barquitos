<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-btn
          block
          elevation="2"
          color="success"
          @click="dialogoFormulario = true"
          >nuevo usuario</v-btn
        >
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text>
            <TablaUsuarios :items="items"></TablaUsuarios>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogoFormulario" max-width="600">
      <v-card>
        <v-card-text>
          <FormularioUsuario v-if="dialogoFormulario"></FormularioUsuario>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// tipos
import { Usuario } from "@/typings/store";
// componentes
import TablaUsuarios from "@/components/usuarios/Tabla.vue";
import FormularioUsuario from "@/components/usuarios/Formulario.vue";

@Component({
  components: {
    TablaUsuarios,
    FormularioUsuario,
  },
})
export default class Usuarios extends Vue {
  dialogoFormulario = false;

  items: Array<Usuario> = [
    {
      id: 0,
      nombre: "usuario 0",
      password: "000000",
      tipo: "administrador",
    },
    {
      id: 1,
      nombre: "usuario 1",
      password: "000000",
      tipo: "cliente",
      cliente: {
        rut: 11111111,
        nombre: "cliente 0",
        direccion: "",
        telefono: 953035459,
        idUsuario: 1,
      },
    },
    {
      id: 2,
      nombre: "usuario 2",
      password: "000000",
      tipo: "asistente",
      asistente: {
        id: 2,
        rut: 22222222,
        nombre: "asistente 2",
        direccion: "",
        telefono: 953035459,
        idUsuario: 2,
      },
    },
  ];
}
</script>
