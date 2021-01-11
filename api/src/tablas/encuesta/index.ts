import * as db from "../../db";
import { CrearEncuestaData } from "../../typings/api";

export const crear = async (
  connection: db.Connection,
  data: CrearEncuestaData
) => {
  return await connection.execute(
    "begin crear_encuesta(:idCliente, :idArriendo, :valoracion, :comentario); end;",
    {
      idCliente: data.idCliente,
      idArriendo: data.idArriendo,
      valoracion: data.valoracion,
      comenrario: data.comentario,
    }
  );
};

// CRUD ENCUESTA
export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from encuesta", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};
