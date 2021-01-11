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

interface Embarcaciones {
  [id: string]: Embarcacion;
}

interface Seguro {
  id: number;
  valor: number;
  embarcacion: Embarcacion;
}

interface Seguros {
  [id: string]: Seguro;
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

interface Arriendos {
  [id: string]: Arriendo;
}
interface Encuesta {
  id: number;
  valoracion: number;
  comentario: string;
  cliente: Cliente;
  arriendo: Arriendo;
}

interface Encuestas {
  [id: string]: Encuesta;
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

interface ArriendosDisponibles {
  [id: string]: ArriendoDisponible;
}

interface Pago {
  id: number;
  valor: number;
  tipo: string;
  arriendo: Arriendo;
}

interface Pagos {
  [id: string]: Pago;
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
    // arriendos
    arriendos: Arriendos;
    allArriendos(): Promise<Arriendos>;
    setArriendos(data: Arriendo): Promise<void>;
    //arriendos disponibles
    arriendosDisponibles: ArriendosDisponibles;
    allArriendosDisponibles(): Promise<Arriendos>;
    setArriendosDisponibles(data: ArriendoDisponible): Promise<void>;
    //embarcaciones
    embarcaciones: Embarcaciones;
    allEmbarcaciones(): Promise<Embarcaciones>;
    setEmbarcaciones(data: Embarcacion): Promise<void>;
    // usuarios
    usuarios: Usuarios;
    allUsuarios(): Promise<Usuarios>;
    setUsuario(data: Usuario): Promise<void>;

    //encuestas
    encuestas: Encuestas;
    allEncuestas(): Promise<Encuestas>;
    setEncuestas(data: Encuesta): Promise<void>;
    deleteEncuestas(id: string): Promise<void>;

    //seguros
    allSeguros(): Promise<Seguros>;
    setSeguros(data: Seguro): Promise<void>;

    // pagos
    pagos: Pagos;
    allPagos(): Promise<Pagos>;
    setPagos(data: Pago): Promise<void>;
  }
}
