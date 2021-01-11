import * as express from "express";
import * as history_api from "connect-history-api-fallback";
import rutas from "./rutas";

const history = history_api({
  disableDotRule: true,
  verbose: true,
});

const app = express();
const port = 8000;

const staticFileMiddleware = express.static("dist");

app.use(staticFileMiddleware);
app.use((req, res, next) => {
  if (req.path.includes("api/")) {
    next();
  } else {
    history(req, res, next);
  }
});

// RUTAS

rutas(app);

app.post("/api/estadoArriendo", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { IDENTIFICADORARR: string };
  try {
    connection = await db.getConnection();

    const rawBD = await estadoArriendo(connection, data);

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
// ---------------------------------

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

// -------------------------------------------------

app.post("/api/nuevoArriendo", async function(req, res) {
  let resultado = undefined;
  const data = req.body as CrearArriendoData;
  try {
    connection = await db.getConnection();

    const rawBD = await nuevoArriendo(connection, data);

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

// -------------------------------------------------

app.post("/api/arriendosActivos", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { ASISTENTE_ID: number; ARRIENDOS_: string };
  try {
    connection = await db.getConnection();

    const rawBD = await arriendosActivos(connection, data);

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

// -------------------------------------------------

app.post("/api/finArriendos", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { ID_ARRIENDO_ES: number; ESTADO_ES: number };
  try {
    connection = await db.getConnection();

    const rawBD = await finArriendo(connection, data);

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

app.post("/api/es_asistente", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { rut: number; password: string };
  try {
    connection = await db.getConnection();

    const rawBD = await esAsistente(connection, data);

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

// -------------------------------------------------

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

app.get("/api/arriendos_disponibles/embarcacion/:id", async function(req, res) {
  let resultado: Resultado = {};
  const idEmbarcacion = parseInt(req.params.id);
  try {
    connection = await db.getConnection();

    const rawBD = await listaArriendosDisponiblesBarco(
      connection,
      idEmbarcacion
    );

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const arriendosDisponibles: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        if (val) {
          arriendosDisponibles[nombreCampo] = val;
        }
      });

      resultado[
        arriendosDisponibles.ID_ARRIENDO_DISPONIBLES
      ] = arriendosDisponibles;
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

app.get("/api/arriendos/encuestas/pendientes/cliente/:id", async function(
  req,
  res
) {
  let resultado: Resultado = {};
  const idCliente = parseInt(req.params.id);
  try {
    connection = await db.getConnection();

    const rawBD = await ListaEncuestasPendientes(connection, idCliente);

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const arriendos: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        if (val) {
          arriendos[nombreCampo] = val;
        }
      });

      resultado[arriendos.ID_ARRIENDO] = arriendos;
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

app.get("/api/arriendos/activos/asistente/:id", async function(req, res) {
  let resultado: Resultado = {};
  const idAsistente = parseInt(req.params.id);
  try {
    connection = await db.getConnection();

    const rawBD = await listaArriendosActivos(connection, idAsistente);

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const arriendos: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        if (val) {
          arriendos[nombreCampo] = val;
        }
      });

      resultado[arriendos.ID_ARRIENDO] = arriendos;
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

app.get("/api/usuarios", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await usuarios.lista(connection);

    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const usuario: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        if (val) {
          usuario[nombreCampo] = val;
        }
      });

      resultado[usuario.ID_USUARIO] = usuario;
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

      const embarcacion: EntraBD = {};

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

app.get("/api/arriendos", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaArriendos(connection);
    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const arriendo: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        arriendo[nombreCampo] = val;
      });

      resultado[arriendo.ID_ARRIENDO] = arriendo;
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

app.get("/api/arriendoDisponibles", async function(req, res) {
  let resultado: Resultado = {};
  try {
    connection = await db.getConnection();

    const rawBD = await listaArriendoDisponibles(connection);
    rawBD.rows?.forEach((item) => {
      const datos = item as Array<any>;

      const arriendos_disponibles: EntraBD = {};

      datos.forEach((val, index) => {
        const nombreCampo = rawBD.metaData
          ? rawBD.metaData[index].name
          : "COL" + index.toString();
        arriendos_disponibles[nombreCampo] = val;
      });

      resultado[
        arriendos_disponibles.ID_arriendo_disponibles
      ] = arriendos_disponibles;
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

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
