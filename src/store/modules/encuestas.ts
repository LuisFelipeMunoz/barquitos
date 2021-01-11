import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Encuesta } from "@/typings/store";
import { State } from "@/store";

interface EncuestasState {
  all: Encuesta;
}

const state: EncuestasState = {
  all: {},
};

const getters: GetterTree<EncuestasState, State> = {};

const mutations: MutationTree<EncuestasState> = {};

const actions: ActionTree<EncuestasState, State> = {
  async set(ctx, data: Encuesta) {
    const encuestas = {
        id: data.id,
        valoracion: data.valoracion,
        comentario: data.comentario,
        cliente: data.cliente,
        arriendo:  data.arriendo,
      },
    };
    const respuesta = await fetch("/api/encuesta", {
      method: "post",
      body: JSON.stringify(usuario),
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

const usuarios = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default usuarios;
