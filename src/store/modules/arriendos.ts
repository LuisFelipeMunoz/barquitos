import { ActionTree, GetterTree, MutationTree } from "vuex";

import { Arriendos } from "@/typings/store";

import { State } from "@/store";
interface ArriendosState {
  all: Arriendos;
}

const state: ArriendosState = {
  all: {},
};

//los getter son funciones que no reciben ningun parametro de entrada, funcionan como si fuera variables
const getters: GetterTree<ArriendosState, State> = {};

//son funciones que modifican los state, reciben datos de entrada y usan esos datos para modificar.
//no devuelven nada.
const mutations: MutationTree<ArriendosState> = {};

//son funciones que utilizan mutation para realizar acciones complejas dentro de los state
//si retornan algo, las acciones son all get set delete patch
const actions: ActionTree<ArriendosState, State> = {
  //funcion asincrona, que cuando la llamas, no responde altiro, tiempo indefinido de ejecusion
  //se pueden ejecutar en segundo plano mientras haces otras cosas, evita que la app se congele.
  //todas las funciones asincronas devuelven una promesa, que es igual a un puntero, pero para que no la tome,
  //se utiliza el await, ya que de esta forma devuelve una respuesta
  async all() {
    const respuesta = await fetch("/api/arriendos");
    return respuesta;
  },
  async get(ctx, id: number) {
    const respuesta = await fetch("/api/arriendos" + id);
    return respuesta;
  },
  async set(
    ctx,
    data: {
      idCliente: number;
      idEmbarcacion: number;
      idArriendoDisponible: number;
      idPago: number;
    }
  ) {
    const arriendo = {
      idCliente: data.idCliente,
      idEmbarcacion: data.idEmbarcacion,
      idArriendoDisponible: data.idArriendoDisponible,
      idPago: data.idPago,
    };

    const respuesta = await fetch("/api/usuarios", {
      method: "post",
      body: JSON.stringify(arriendo),
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

  async listaPendientesAsistente(ctx, id: number) {
    const respuesta = await fetch("/api/arriendos/pendientes/asistente/" + id);
    return respuesta;
  },
  async listaEncuestasPendientesCliente(ctx, id: number) {
    const respuesta = await fetch(
      "/api/arriendos/encuestas/pendientes/cliente/" + id
    );
    return respuesta;
  },

  finalizar(ctx, data: { idArriendo: number }) {
    const body = {
      idArriendo: data.idArriendo,
    };
    const respuesta = fetch("/api/arriendos/finalizar", {
      method: "post",
      body: JSON.stringify(body),
    });
    return respuesta;
  },
};

const arriendo = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default arriendo;
