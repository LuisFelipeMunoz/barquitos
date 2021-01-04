import Vue from "vue";
import "@mdi/font/css/materialdesignicons.css";
import Vuetify from "vuetify/lib/framework";
import es from "vuetify/src/locale/es";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { es },
    current: "es",
  },
});
