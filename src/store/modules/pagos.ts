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
  async all() {
    const respuesta = await fetch("/api/pagos");
    const data = (await respuesta.json()) as { [id: string]: any };
    const temp = Object.values(data).map((item) => {
      const pago: Pago = {
        id: item.ID_PAGO.toString(),
        valor: item.VALOR,
        tipo: item.TIPO,
      };
      return pago;
    }); //objeto de objetos a arreglo de objetos
    const pagos: Pagos = {};
    temp.forEach((item) => {
      pagos[item.id] = item;
    });
    return pagos;
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
  async setArriendo(ctx, data: { idEmbarcacion: string; tipo: string }) {
    const respuesta = await fetch("/api/pagos/arriendo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idEmbarcacion: parseInt(data.idEmbarcacion),
        tipo: data.tipo,
      }),
    });
    return await respuesta.json();
  },
};

const pagos = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default pagos;
