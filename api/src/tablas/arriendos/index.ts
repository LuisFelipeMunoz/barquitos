import * as db from "../../db";
import { FinArriendoData, NuevoArriendoData } from "../../typings/api";

// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
export const listaEncuestasPendientes = async (
  connection: db.Connection,
  idCliente: number
) => {
  return await connection.execute(
    "select * from arriendo left outer join encuesta on arriendo.id_arriendo = encuensta.id_arriendo where arriendo.id_cliente = :id and encuesta.id_encuesta = null",
    [idCliente],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
};

// CRUD ARRIENDO
export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from arriendo", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};

//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
export const listaActivos = async (
  connection: db.Connection,
  idAsistente: number
) => {
  return await connection.execute(
    "select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;",
    [idAsistente],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
};

//---------------------------------------------------
// FIN ARRIENDO
//---------------------------------------------------

export const finalizar = async (
  connection: db.Connection,
  data: FinArriendoData
) => {
  return await connection.execute(
    "begin fin_arriendo(:idArriendo, :mensaje, :resultado); END;",
    {
      idArriendo: data.idArriendo,
      mensaje: { type: db.STRING, dir: db.BIND_OUT },
      resultado: { type: db.NUMBER, dir: db.BIND_OUT },
    }
  );
};

//---------------------------------------------------
// NUEVO ARRIENDO
//---------------------------------------------------

export const crear = async (
  connection: db.Connection,
  data: NuevoArriendoData
) => {
  return await connection.execute(
    "begin crear_arriendo(:idCliente, :idEmbarcacion, :idArriendoDisponible, :idPago, :mensaje, :resultado ); end;",
    {
      idCliente: data.idCliente,
      idEmbarcacion: data.idEmbarcacion,
      idArriendoDisponible: data.idArriendoDisponible,
      idPago: data.idPago,
      mensaje: { type: db.STRING, dir: db.BIND_OUT },
      resultado: { type: db.STRING, dir: db.BIND_OUT },
    }
  );
};
