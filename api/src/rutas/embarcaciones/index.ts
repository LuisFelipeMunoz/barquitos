app.post("/api/crear_embarcacion", async function(req, res) {
  let resultado = undefined;
  const data = req.body as IngresarEmbarcacionData;
  try {
    connection = await db.getConnection();

    const rawBD = await embarcaciones.crear(connection, data);

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

app.post("/api/quitar_embarcacion", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { idEmbarcacion: number };
  try {
    connection = await db.getConnection();

    const rawBD = await embarcaciones.quitar(connection, data);

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

app.get("/api/embarcaciones/arriendos_disponibles", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaBarcosArriendoDisponibles(connection);

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const embarcacion: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        if (val) {
          embarcacion[nombreCampo] = val;
        }
      });

      resultado[embarcacion.ID_EMBARCACION] = embarcacion;
    });
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

app.get("/api/embarcaciones", async function(req, res) {
  let resultado: Resultado = {};

  try {
    connection = await db.getConnection();

    const rawBD = await listaEmbarcaciones(connection);

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const embarcacion: EntradaBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        embarcacion[nombreCampo] = val;
      });

      resultado[embarcacion.ID_EMBARCACION] = embarcacion;
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
