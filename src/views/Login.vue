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

@Component({
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

  login(data: { nombre: string; password: string }) {
    // codigo consulta api login
    console.log("login");
  }
}
</script>

<style scoped></style>
