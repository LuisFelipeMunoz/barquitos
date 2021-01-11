import * as db from "../../db";
import { ListaArriendosDisponiblesEmbarcacionData } from "../../typings/api";

export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};

// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
export const ListaEmbarcacion = async (
  connection: db.Connection,
  data: ListaArriendosDisponiblesEmbarcacionData
) => {
  return await connection.execute(
    "select * from arriendos_disponibles where id_embarcacion = :id",
    [data.idEmbarcacion],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
};
