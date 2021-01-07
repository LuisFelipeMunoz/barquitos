import Vue from "vue";
import * as Firebase from "firebase/app";

type User = Firebase.User;

interface Usuario {
  id: number;
  nombre: string;
  password: string;
  tipo: "administrador" | "cliente" | "asistente";
  cliente?: Cliente;
  asistente?: Asistente;
}

interface Cliente {
  rut: number;
  nombre: string;
  direccion: string;
  telefono: number;
  idUsuario: number;
}

interface Asistente {
  id: number;
  rut: number;
  nombre: string;
  direccion: string;
  telefono: number;
  idUsuario: number;
}

interface Usuarios {
  [id: string]: Usuario;
}

interface Ruta {
  id: string;
  icon: string;
  text: string;
  to?: {
    name: string;
  };
  disabled?: boolean;
}

type Rutas = Array<Ruta>;

declare module "vue/types/vue" {
  interface Vue {
    // user
    getUser: User | null;
    setUser(data: User | null): void;
  }
}
