import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Pago, Pagos } from "@/typings/store";
import { State } from "@/store";

interface PagosState {
  all: Pagos;
}

const state: PagosState = {
  all: {},
};

const getters: GetterTree<PagosState, State> = {};

const mutations: MutationTree<PagosState> = {};

const actions: ActionTree<PagosState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/pagos");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
  },
  async set(ctx, data: Pago) {
    const pago = {
      pago: {
        id: data.id,
        idArriendo: data.arriendo.id,
        valor: data.valor,
        tipo: data.tipo,
      },
    };
    const respuesta = await fetch("/api/pagos", {
      method: "post",
      body: JSON.stringify(pago),
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
  iniciarSesion(ctx, data: { nombre: string; password: string }) {},
};

const pagos = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default pagos;
