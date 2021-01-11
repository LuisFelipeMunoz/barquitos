import { ActionTree, GetterTree, MutationTree } from "vuex";

//tipos
import { Usuario, Usuarios } from "@/typings/store";
import { State } from "@/store";

interface UsuariosState {
  all: Usuarios;
}

const state: UsuariosState = {
  all: {},
};

const getters: GetterTree<UsuariosState, State> = {};

const mutations: MutationTree<UsuariosState> = {};

const actions: ActionTree<UsuariosState, State> = {
  async all(ctx) {
    const respuesta = await fetch("/api/usuarios");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
    return id;
    return id;
  },
  async set(ctx, data: Usuario) {
    const usuario = {
      usuario: {
        nombre: data.nombre,
        password: data.password,
        tipo: data.tipo,
      },
      persona: {
        rut:
          data.tipo == "administrador"
            ? ""
            : data.tipo == "asistente"
            ? data.asistente?.rut
            : data.cliente?.rut,
        nombre:
          data.tipo == "administrador"
            ? ""
            : data.tipo == "asistente"
            ? data.asistente?.nombre
            : data.cliente?.nombre,
        telefono:
          data.tipo == "administrador"
            ? ""
            : data.tipo == "asistente"
            ? data.asistente?.telefono
            : data.cliente?.telefono,
        direccion:
          data.tipo == "administrador"
            ? ""
            : data.tipo == "asistente"
            ? data.asistente?.direccion
            : data.cliente?.direccion,
      },
    };
    const respuesta = await fetch("/api/usuarios", {
      method: "post",
      body: JSON.stringify(usuario),
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

const usuarios = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default usuarios;
