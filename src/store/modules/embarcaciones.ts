import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Embarcacion, Embarcaciones } from "@/typings/store";
import { State } from "@/store";

interface EmbarcacionesState {
  all: Embarcaciones;
}

const state: EmbarcacionesState = {
  all: {},
};

const getters: GetterTree<EmbarcacionesState, State> = {};

const mutations: MutationTree<EmbarcacionesState> = {};

const actions: ActionTree<EmbarcacionesState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/embarcaciones");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
  async set(ctx, data: Embarcacion) {
    const Embarcacion = {
      embarcacion: {
        idAsistente: data.asistente.id,
        tipo: data.tipo,
        precio: data.precio,
        patente: data.patente,
      },
    };
    const respuesta = await fetch("/api/embarcaciones", {
      method: "post",
      body: JSON.stringify(Embarcacion),
    });
    return respuesta;
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
  async arriendosDisponibles(ctx) {
    const respuesta = await fetch("/api/embarcaciones/arriendos_disponibles");
    return respuesta;
  },
};

const embarcaciones = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default embarcaciones;
