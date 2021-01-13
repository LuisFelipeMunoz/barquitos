<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="10" md="6" lg="3">
        <FormularioLogin @click-login="login"></FormularioLogin>
      </v-col>
    </v-row>
    <Snackbar
      :color="snackbar.color"
      :text="snackbar.text"
      v-model="snackbar.model"
    ></Snackbar>
  </v-container>
</template>

<script lang="ts">
// decoradores
import { Component, Vue } from "vue-property-decorator";
// componentes
import FormularioLogin from "@/components/login/Formulario.vue";
import Snackbar from "@/components/Snackbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import { State } from "@/store";

@Component({
  methods: {
    ...mapActions({
      iniciarSesion: "usuarios/iniciarSesion",
    }),
    ...mapMutations({
      setUsuario: "setUsuario",
    }),
  },
  computed: mapState({
    usuarioLogin: (val) => {
      const state = val as State;
      return state.usuario;
    },
  }),
  components: {
    FormularioLogin,
    Snackbar,
  },
})
export default class Home extends Vue {
  snackbar = {
    model: false,
    color: "info",
    text: "",
  };

  async mensaje(texto: string, tipo: "error" | "warning" | "success" | "info") {
    this.snackbar.model = false;
    await this.$nextTick();
    this.snackbar.color = tipo;
    this.snackbar.text = texto;
    this.snackbar.model = true;
  }

  async login(data: { nombre: string; password: string }) {
    // codigo consulta api login
    console.log("login", data);
    const usuarios = await this.iniciarSesion(data);
    console.log(usuarios);
    const temp = Object.values(usuarios);
    if (temp.length > 0) {
      const usuario = temp[0];
      this.setUsuario(usuario);
      console.log(this.usuarioLogin);
      switch (usuario.tipo) {
        case "cliente":
          this.$router.push({
            name: "embarcaciones.disponibles",
          });
          break;
        case "asistente":
          this.$router.push({
            name: "arriendos.pendientes",
          });
          break;
        case "administrador":
          this.$router.push({
            name: "arriendos",
          });
          break;
      }
    } else {
      this.mensaje("Intentelo otra vez", "error");
    }
  }
}
</script>

<style scoped></style>
