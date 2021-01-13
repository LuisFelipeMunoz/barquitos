import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Asistente, Embarcacion, Embarcaciones } from "@/typings/store";
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
  async all() {
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
    const embarcacion = {
      idAsistente: data.asistente.id,
      tipo: data.tipo,
      precio: data.precio,
      patente: data.patente,
    };
    const respuesta = await fetch("/api/embarcaciones", {
      method: "post",
      body: JSON.stringify(embarcacion),
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
  async arriendosDisponibles() {
    const respuesta = await fetch("/api/embarcaciones/arriendos_disponibles");
    const data = (await respuesta.json()) as { [id: string]: any };
    console.log(data);
    const temp = Object.values(data).map((item) => {
      const asistente: Asistente = {
        id: item.ID_ASISTENTE.toString(),
        rut: item.RUT_ASISTENTE,
        nombre: item.NOMBREASISTENTE,
        direccion: item.DIRECCION_ASISTENTE,
        telefono: item.TELEFONO_ASISTENTE,
        idUsuario: item.ID_USUARIO_ASISTENTE,
      };
      const embarcacion: Embarcacion = {
        id: item.ID_EMBARCACION.toString(),
        tipo: item.TIPOEMBARCACION,
        precio: item.PRECIO,
        patente: item.PATENTE,
        asistente: asistente,
      };
      return embarcacion;
    }); //objeto de objetos a arreglo de objetos
    console.log(temp);
    const embarcaciones: Embarcaciones = {};
    temp.forEach((item) => {
      embarcaciones[item.id] = item;
    });
    console.log(embarcaciones);
    return embarcaciones;
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
