import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Encuesta, Encuestas } from "@/typings/store";
import { State } from "@/store";

interface EncuestasState {
  all: Encuestas;
}

const state: EncuestasState = {
  all: {},
};

const getters: GetterTree<EncuestasState, State> = {};

const mutations: MutationTree<EncuestasState> = {};

const actions: ActionTree<EncuestasState, State> = {
  async set(ctx, data: Encuesta) {
    const encuesta = {
      encuesta: {
        idCliente: data.cliente.rut,
        idArriendo: data.arriendo.id,
        valoracion: data.valoracion,
        comentario: data.comentario,
      },
    };
    const respuesta = await fetch("/api/encuestas", {
      method: "post",
      body: JSON.stringify(encuesta),
    });
    return respuesta;
  },
  delete(ctx, id: string) {
    if (!id) {
      return "";
    }
    ctx.commit("delete", id);
    return id;
  },
};

const encuestas = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default encuestas;
