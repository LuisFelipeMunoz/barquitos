import * as db from "../../db";
import { CrearPagoArriendoData, CrearPagoData } from "../../typings/api";

export const crear = async (connection: db.Connection, data: CrearPagoData) => {
  return await connection.execute(
    "begin hace_unpago(:id, :idArriendo, :valor, :tipo); END;",
    {
      id: data.id,
      idArriendo: data.idArriendo,
      valor: data.valor,
      tipo: data.tipo,
    }
  );
};

export const crearArriendo = async (
  connection: db.Connection,
  data: CrearPagoArriendoData
) => {
  return await connection.execute(
    "begin crear_pago_arriendo(:idEmbarcacion, :tipo, :resultado, :mensaje); END;",
    {
      idEmbarcacion: data.idEmbarcacion,
      tipo: data.tipo,
      resultado: { type: db.STRING, dir: db.BIND_OUT },
      mensaje: { type: db.STRING, dir: db.BIND_OUT },
    }
  );
};

// CRUD PAGO
export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};
