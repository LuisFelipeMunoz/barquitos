import * as oracledb from "oracledb";
import * as express from "express";
import * as history_api from "connect-history-api-fallback";

interface EntraBD {
  [nombreCampo: string]: any;
}
interface Resultado {
  [id: number]: EntraBD;
}

let connection: oracledb.Connection | undefined = undefined;

const usuario = "usuario";
const mypw = "123456";

async function listaUsuarios(connection: oracledb.Connection) {
  return await connection.execute(
    "select * from usuario left outer join cliente on (cliente.id_usuario = usuario.id_usuario) left outer join asistente on (asistente.id_usuario = usuario.id_usuario)",
    [],
    {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

async function iniciarSesion(
  connection: oracledb.Connection,
  login: { rut: number; password: string }
) {
  return await connection.execute(
    "begin iniciar_sesion(:rut, :password, :resultado, :mensaje); END;",
    {
      rut: login.rut,
      password: login.password,
      resultado: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      mensaje: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

// Una funcion que enliste todos los barcos que tiene arriendos disponibles
async function listaBarcosArriendoDisponibles(connection: oracledb.Connection) {
  return await connection.execute(
    "select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion",
    [],
    {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
async function listaArriendosDisponiblesBarco(
  connection: oracledb.Connection,
  idEmbarcacion: number
) {
  return await connection.execute(
    "select * from arriendos_disponibles where id_embarcacion = :id",
    [idEmbarcacion],
    {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
async function ListaEncuestasPendientes(
  connection: oracledb.Connection,
  idCliente: number
) {
  return await connection.execute(
    "select * from arriendo left outer join encuesta on arriendo.id_arriendo = encuensta.id_arriendo where arriendo.id_cliente = :id and encuesta.id_encuesta = null",
    [idCliente],
    {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

// // CRUD EMBARCACIONES
async function listaEmbarcaciones(connection: oracledb.Connection) {
  return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

// CRUD SEGUROS
async function listaSeguros(connection: oracledb.Connection) {
  return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

// CRUD ARRIENDO
async function listaArriendos(connection: oracledb.Connection) {
  return await connection.execute("select * from arriendo", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

// CRUD PAGO
async function listaPagos(connection: oracledb.Connection) {
  return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

// CRUD ENCUESTA
async function listaEncuestas(connection: oracledb.Connection) {
  return await connection.execute("select * from encuesta", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

// CRUD ARRIENDOS DISPONIBLES
async function listaArriendoDisponibles(connection: oracledb.Connection) {
  return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
  });
}

//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
async function listaArriendosActivos(
  connection: oracledb.Connection,
  idAsistente: number
) {
  return await connection.execute(
    "select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;",
    [idAsistente],
    {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

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

// login

app.post("/api/iniciar_sesion", async function(req, res) {
  let resultado = undefined;
  const login = req.body as { rut: number; password: string };
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await iniciarSesion(connection, login);

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await listaUsuarios(connection);

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaSeguros(connection);

    console.log(resultado.metaData);
    console.log(resultado.rows);
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

app.get("/api/arriendos", async function(req, res) {
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaArriendos(connection);

    console.log(resultado.metaData);
    console.log(resultado.rows);
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
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaPagos(connection);

    console.log(resultado.metaData);
    console.log(resultado.rows);
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
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaEncuestas(connection);

    console.log(resultado.metaData);
    console.log(resultado.rows);
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

app.get("/api/arriendoDisponibles", async function(req, res) {
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaArriendoDisponibles(connection);

    console.log(resultado.metaData);
    console.log(resultado.rows);
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

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
