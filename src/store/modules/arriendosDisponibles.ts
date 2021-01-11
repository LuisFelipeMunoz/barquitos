import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import {
  ArriendoDisponible,
  ArriendosDisponibles,
  Embarcacion,
} from "@/typings/store";
import { State } from "@/store";
interface ArriendosDisponiblesState {
  all: ArriendosDisponibles;
}

const state: ArriendosDisponiblesState = {
  all: {},
};

const getters: GetterTree<ArriendosDisponiblesState, State> = {};

const mutations: MutationTree<ArriendosDisponiblesState> = {};

const actions: ActionTree<ArriendosDisponiblesState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/arriendoDisponibles");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
  async set(ctx, data: ArriendoDisponible) {},
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
  async listaEmbarcacion(ctx, data: Embarcacion) {
    const respuesta = await fetch(
      "/api/arriendos_disponibles/embarcacion/" + data.id
    );
    return respuesta;
  },
};

const arriendosDisponibles = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default arriendosDisponibles;
