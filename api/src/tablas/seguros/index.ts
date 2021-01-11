import * as db from "../../db";
import { ListaSeguros } from "../../typings/api";

// CRUD SEGUROS
export const listaSeguros =  async(connection: db.Connection,
  data: ListaSeguros ) => {
  return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}
