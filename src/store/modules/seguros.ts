import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Seguros } from "@/typings/store";
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
  async all() {
    const respuesta = await fetch("/api/seguros");
    return respuesta;
  },

  // async all() {
  //   const respuesta = await fetch("/api/pagos");
  //   const data = (await respuesta.json()) as { [id: string]: any };
  //   const temp = Object.values(data).map((item) => {
  //     const pago: Pago = {
  //       id: item.ID_PAGO.toString(),
  //       valor: item.VALOR,
  //       tipo: item.TIPO.toString(),
  //       arriendo: item.ID_ARRIENDO, //AQUI SE SUPONE QUE NO LO TENGO DEFINIDO. ////////////////////////
  //     };
  //     return pago;
  //   }); //objeto de objetos a arreglo de objetos
  //      const pagos: Pagos = {};
  //      temp.forEach((item) => {
  //       pagos[item.id] = item;
  //      });
  //      return pagos;
  // },

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
};

const seguros = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default seguros;
