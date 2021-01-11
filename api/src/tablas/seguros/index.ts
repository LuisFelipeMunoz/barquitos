// CRUD SEGUROS
export const listaSeguros =  async(connection: db.Connection
  ,data: { rut: number; password: string }) {
  return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}
