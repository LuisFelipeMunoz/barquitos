import { Usuario } from "@/typings/store";
import Vue from "vue";
import Vuex, { MutationTree, StoreOptions } from "vuex";

Vue.use(Vuex);

import modules from "./modules";

export interface State {
  value: string;
  usuario: Usuario | null;
}

const state: State = {
  value: "La Carito Sabe XD????",
  usuario: null,
};
const mutations: MutationTree<State> = {
  setUsuario(state, data) {
    state.usuario = data;
  },
};

const storeData: StoreOptions<State> = {
  state,
  modules,
  mutations,
};

const store = new Vuex.Store(storeData);

export default store;
