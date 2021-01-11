import { ActionTree, GetterTree, MutationTree } from "vuex";

import { Arriendo,Arriendos } from "@/typings/store";

import { State } from "@/store";
interface ArriendosState {
  all: Arriendos;
}

const state: ArriendosState = {
  all: {},
};

const getters: GetterTree<ArriendosState, State> = {};

const mutations: MutationTree<ArriendosState> = {};

const actions: ActionTree<ArriendosState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/arriendos");
    return respuesta;
  },
  async get(ctx, id: number) {
    const respuesta = await fetch("/api/arriendos/"+id);
    return respuesta;
    
  },
  async set(ctx, data: {
        idCliente: number;
        idEmbarcacion: number;
        idArriendoDisponible: number;
        idPago: number;}) {

    const arriendo = {
        idCliente: data.idCliente,
        idEmbarcacion: data.idEmbarcacion,
        idArriendoDisponible: data.idArriendoDisponible,
        idPago: data.idPago,
    }

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
    const respuesta = await fetch("/api/arriendos/pendientes/asistente/"+id);
    return respuesta;
    
  },
  async listaEncuestasPendientesCliente(ctx, id: number) {
    const respuesta = await fetch("/api/arriendos/encuestas/pendientes/cliente/"+id);
    return respuesta;
  },

  finalizar(ctx, data: { idArriendo:number }) {
    const body = {
      idArriendo: data.idArriendo
    }
    const respuesta = fetch("/api/arriendos/finalizar", {
      method: "post",
      body: JSON.stringify(body)
    })
    return respuesta
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
