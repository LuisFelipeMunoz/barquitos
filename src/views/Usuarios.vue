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
import { Usuarios } from "@/typings/store";
// componentes
import TablaUsuarios from "@/components/usuarios/Tabla.vue";
import FormularioUsuario from "@/components/usuarios/Formulario.vue";
import { mapActions } from "vuex";

@Component({
  methods: mapActions({
    allUsuarios: "usuarios/all",
    setUsuario: "usuarios/set",
  }),
  components: {
    TablaUsuarios,
    FormularioUsuario,
  },
})
export default class VistaUsuarios extends Vue {
  async created() {
    this.usuarios = await this.allUsuarios();
  }

  dialogoFormulario = false;

  usuarios: Usuarios = {};

  get items() {
    return Object.values(this.usuarios);
  }
}
</script>
