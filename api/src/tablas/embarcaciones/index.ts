import * as db from "../../db";
import { CrearEmbarcacionData, QuitarEmbarcacionData } from "../../typings/api";

export const crear = async (
  connection: db.Connection,
  data: CrearEmbarcacionData
) => {
  return await connection.execute(
    "begin crear_embarcacion(:idAsistente, :tipo, :precio, :patente, :mensaje, :resultado); end;",
    {
      idAsistente: data.idAsistente,
      tipo: data.tipo,
      precio: data.precio,
      patente: data.patente,
    }
  );
};

export const quitar = async (
  connection: db.Connection,
  data: QuitarEmbarcacionData
) => {
  return await connection.execute(
    "begin quitar_embarcacion(:idEmbarcacion, :mensaje); END;",
    {
      idEmbarcacion: data.idEmbarcacion,
      mensaje: { type: db.STRING, dir: db.BIND_OUT },
    }
  );
};

export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};

// Una funcion que enliste todos los barcos que tiene arriendos disponibles
export const listaArriendosDisponibles = async (connection: db.Connection) => {
  return await connection.execute(
    //es un if, la primera parte es la condicion.
    "select * from embarcacion inner join arriendos_disponibles on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion inner join asistente on embarcacion.id_asistente = asistente.id_asistente",
    [],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
};
