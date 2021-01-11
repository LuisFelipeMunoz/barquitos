app.post("/api/crearEncuesta", async function(req, res) {
  let resultado = undefined;
  const data = req.body as CrearEncuestaData;
  try {
    connection = await db.getConnection();

    const rawBD = await crearEncuesta(connection, data);

    resultado = rawBD;
  } catch (err) {
    console.error(err);
    resultado = err;
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
        resultado = err;
      }
    }
  }
  res.send(resultado);
});

app.get("/api/encuestas", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaEncuestas(connection);
    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const encuesta: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        encuesta[nombreCampo] = val;
      });

      resultado[encuesta.ID_ENCUESTA] = encuesta;
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
