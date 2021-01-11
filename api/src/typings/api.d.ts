export interface EntraBD {
  [nombreCampo: string]: any;
}

export interface Resultado {
  [id: number]: EntraBD;
}

export interface CrearUsuarioData {
  usuario: {
    nombre: string;
    password: string;
    tipo: "administrador" | "cliente" | "asistente";
  };
  persona: {
    rut: string;
    nombre: string;
    telefono: string;
    direccion: string;
  };
}

export interface CrearEncuestaData {
  idCliente: number;
  idArriendo: number;
  valoracion: number;
  comentario: string;
}

export interface CrearPagoData {
  id: number;
  idArriendo: number;
  valor: number;
  tipo: string;
}

export interface IngresarEmbarcacionData {
  id: number;
  tipo: string;
  precio: number;
  patente: string;
}

export interface CrearArriendoData {
  NEW_RUT: number;
  NEW_ID_EMBARCACION: number;
  NEW_ID_ARRIENDO_DISPONIBLES: number;
}
