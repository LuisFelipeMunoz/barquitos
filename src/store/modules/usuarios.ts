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
  async all() {
    const respuesta = await fetch("/api/usuarios");
    return respuesta;
  },
  async get(ctx, id: number) {
    if (!id) {
      return "";
    }
    // falta la funcion en la api
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
  async iniciarSesion(ctx, login: { nombre: string; password: string }) {
    console.log(login);
    const respuesta = await fetch("/api/usuarios/iniciar_sesion", {
      method: "post",
      body: JSON.stringify(login),
    });
    const data = (await respuesta.json()) as { [id: string]: any };
    const temp = Object.values(data).map((item) => {
      const usuario: Usuario = {
        id: item.ID_USUARIO.toString(),
        nombre: item.NOMBRE_USUARIO,
        password: item.CONTRAENIA,
        tipo: item.TIPO.toLowerCase(),
      };
      switch (usuario.tipo) {
        case "cliente":
          usuario.cliente = {
            rut: item.RUT,
            nombre: item.NOMBRECLIENTE,
            direccion: item.DIRECCION,
            telefono: item.TELEFONO,
          };
          break;
        case "asistente":
          usuario.asistente = {
            id: item.ID_ASISTENTE.toString(),
            rut: item.RUT,
            nombre: item.NOMBREASISTENTE,
            direccion: item.DIRECCION,
            telefono: item.TELEFONO,
            idUsuario: item.ID_USUARIO,
          };
          break;
      }
      return usuario;
    }); //objeto de objetos a arreglo de objetos
    const usuarios: Usuarios = {};
    temp.forEach((item) => {
      usuarios[item.id] = item;
    });
    return usuarios;
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
