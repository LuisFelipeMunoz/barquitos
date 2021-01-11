export interface EntradaBD {
  [nombreCampo: string]: any;
}

export interface Resultado {
  [id: number]: EntradaBD;
}

export interface CrearUsuarioData {
  usuario: {
    nombre: string;
    password: string;
    tipo: "administrador" | "cliente" | "asistente";
  };
  persona: {
    rut: number;
    nombre: string;
    telefono: number;
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

export interface CrearEmbarcacionData {
  idAsistente: number;
  tipo: string;
  precio: number;
  patente: string;
}

export interface FinArriendoData {
  idArriendo: number;
}

export interface CrearArriendoData {
  idCliente: number;
  idEmbarcacion: number;
  idArriendoDisponible: number;
  idPago: number;
}

export interface IniciarSesionData {
  nombre: string;
  password: string;
}

export interface QuitarEmbarcacionData {
  idEmbarcacion: number;
}

export interface BuscarArriendoData {
  idArriendo: number;
}

export interface ListaPendientesAsistenteData {
  idAsistente: number;
}

export interface ListaEncuestasPendientesClienteData {
  idCliente: number;
}

export interface ListaArriendosDisponiblesEmbarcacionData {
  idEmbarcacion: number;
}
