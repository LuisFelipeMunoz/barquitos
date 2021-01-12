import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

import modules from "./modules";

export interface State {
  value: string;
}

const state: State = {
  value: "La Carito Sabe XD????",
};

const storeData: StoreOptions<State> = {
  state,
  modules,
};

const store = new Vuex.Store(storeData);

export default store;
