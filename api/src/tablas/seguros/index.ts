import * as db from "../../db";

// CRUD SEGUROS
export const lista = async (connection: db.Connection) => {
  return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
};
