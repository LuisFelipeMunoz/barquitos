import * as db from "../../db";
import { IngresarEmbarcacionData } from "../../typings/api";

export const crear = async (
  connection: db.Connection,
  data: IngresarEmbarcacionData
) => {
  return await connection.execute(
    "begin ingresar_embarcacion(:id, :tipo, :precio, :patente); END;",
    {
      id: data.id,
      tipo: data.tipo,
      precio: data.precio,
      patente: data.patente,
    }
  );
};

export const quitar = async (
  connection: db.Connection,
  data: { idEmbarcacion: number }
) => {
  return await connection.execute(
    "begin quitar_embarcacion(:idEmbarcacion, :mensaje); END;",
    {
      idEmbarcacion: data.idEmbarcacion,
      mensaje: { type: db.STRING, dir: db.BIND_OUT },
    }
  );
};

async function listaEmbarcaciones(connection: db.Connection) {
  return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}

// Una funcion que enliste todos los barcos que tiene arriendos disponibles
async function listaBarcosArriendoDisponibles(connection: db.Connection) {
  return await connection.execute(
    "select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion",
    [],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
}
