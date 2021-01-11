import * as db from "../../db";
import { } from "../../typings/api";

// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
export const listaBarco = async (
  connection: db.Connection,
  idEmbarcacion: number
) => {
  return await connection.execute(
    "select * from arriendos_disponibles where id_embarcacion = :id",
    [idEmbarcacion],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

// CRUD ARRIENDOS DISPONIBLES
export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}
