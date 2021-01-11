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
  rut: number;
  password: number;
}

export interface QuitaEmbarcacion {
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
