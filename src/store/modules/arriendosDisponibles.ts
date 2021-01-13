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
  async all() {
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
  async set(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
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
  async listaEmbarcacion(ctx, embarcacion: Embarcacion) {
    const respuesta = await fetch(
      "/api/arriendos_disponibles/embarcacion/" + embarcacion.id
    );
    const data = (await respuesta.json()) as { [id: string]: any };
    const temp = Object.values(data).map((item) => {
      const arriendoDisponible: ArriendoDisponible = {
        id: item.ID_ARRIENDO_DISPONIBLES.toString(),
        retiro: {
          lugar: item.LUGAR_RETIRO,
          fecha: item.FECHA_RETIRO,
          hora: item.HORA_RETIRO,
        },
        entrega: {
          lugar: item.LUGAR_ENTREGA,
          fecha: item.FECHA_ENTREGA,
          hora: item.HORA_ENTREGA,
        },
        embarcacion: embarcacion,
      };
      return arriendoDisponible;
    });
    console.log(temp);
    const arriendosDisponibles: ArriendosDisponibles = {};
    temp.forEach((item) => {
      arriendosDisponibles[item.id] = item;
    });
    console.log(arriendosDisponibles);
    return arriendosDisponibles;
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
