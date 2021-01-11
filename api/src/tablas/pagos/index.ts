import * as db from "../../db";
import { CrearPagoData } from "../../typings/api";

export const crear = async (
  connection: db.Connection, 
  data: CrearPagoData
  ) => {
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

// CRUD PAGO
export const lista =  async (connection: db.Connection) => {
  return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}
