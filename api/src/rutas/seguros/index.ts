app.get("/api/seguros", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaSeguros(connection);
    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const seguro: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        seguro[nombreCampo] = val;
      });

      resultado[seguro.ID_SEGURO] = seguro;
    });
  } catch (err) {
    console.error(err);
    resultado[0] = { error: err };
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        resultado[0] = { error: err };
      }
    }
  }
  res.send(resultado);
});
