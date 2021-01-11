app.post("/api/hace_unpago", async function(req, res) {
  let resultado = undefined;
  const data = req.body as CrearPagoData;
  try {
    connection = await db.getConnection();

    const rawBD = await pagos.crear(connection, data);

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

app.get("/api/pagos", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaPagos(connection);
    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const pago: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        pago[nombreCampo] = val;
      });

      resultado[pago.ID_PAGO] = pago;
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
