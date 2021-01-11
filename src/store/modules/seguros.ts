import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Seguro, Seguros } from "@/typings/store";
import { State } from "@/store";

interface SegurosState {
  all: Seguros;
}

const state: SegurosState = {
  all: {},
};

const getters: GetterTree<SegurosState, State> = {};

const mutations: MutationTree<SegurosState> = {};

const actions: ActionTree<SegurosState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/seguros");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
  async set(ctx, data: Seguro) {},
  patch(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
  delete(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
};

const seguros = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default seguros;
