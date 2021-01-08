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

interface Embarcacion {
  id: number;
  tipo: string;
  precio: number;
  patente: number;
  asistente: Asistente;
}

interface Seguro {
  id: number;
  valor: number;
  embarcacion: Embarcacion;
}

interface Arriendo {
  id: number;
  asistente: Asistente;
  embarcacion: Embarcacion;
  cliente: Cliente;
  seguro: Seguro;
  retiro: {
    lugar: string;
    fecha: string;
    hora: string;
  };
  entrada: {
    lugar: string;
    fecha: string;
    hora: string;
  };
  valor: number;
  estado: boolean; // false = pendiente, true = finalizado
}

interface Encuesta {
  id: number;
  valoracion: number;
  comentario: string;
  cliente: Cliente;
  arriendo: Arriendo;
}

interface ArriendoDisponible {
  id: number;
  retiro: {
    lugar: string;
    fecha: string;
    hora: string;
  };
  entrada: {
    lugar: string;
    fecha: string;
    hora: string;
  };
  embarcacion: Embarcacion;
}

interface Pago {
  id: number;
  valor: number;
  tipo: string;
  arriendo: Arriendo;
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
