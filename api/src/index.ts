import * as oracledb from "oracledb";
import * as express from "express";
import * as history_api from "connect-history-api-fallback";

interface EntraBD {
  [nombreCampo: string]: any;
}

interface Resultado {
  [id: number]: EntraBD;
}

interface CrearUsuarioData {
  usuario: {
    nombre: string;
    password: string;
    tipo: "administrador" | "cliente" | "asistente";
  };
  persona: {
    rut: string;
    nombre: string;
    telefono: string;
    direccion: string;
  };
}

interface IngresoArriendoBarcoData {
  idCliente: number;
  idEmbarcacion: number;
  idAsistente: number;
  idSeguro: number;
  idPago: number;
  retiro: {
    lugar: string;
    fecha: string;
    hora: string;
  };
  entrega: {
    lugar: string;
    fecha: string;
    hora: string;
  };
}

interface CrearEncuestaData {
  idCliente: number;
  idArriendo: number;
  valoracion: number;
  comentario: string;
}

interface HaceUnPagoData {
  id: number;
  idArriendo: number;
  valor: number;
  tipo: string;
}

interface IngresarEmbarcacionData {
  id: number;
  tipo: string;
  precio: number;
  patente: string;
}

interface NuevoArriendoData {
  NEW_ID_ARRIENDO: number;
  NEW_RUT: number;
  NEW_ID_EMBARCACION: number;
  NEW_ID_ARRIENDO_DISPONIBLES: number;
  RESULTADO_OUT: boolean;
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

async function crearUsuario(
  connection: oracledb.Connection,
  data: CrearUsuarioData
) {
  return await connection.execute(
    "begin crear_usuario(:nombreUsuario, :password, :tipo, :rut, :nombrePersona, :telefono, :direccion, :mensaje, :resultado); end;",
    {
      nombreUsuario: data.usuario.nombre,
      password: data.usuario.password,
      tipo: data.usuario.tipo,
      rut: data.persona.rut,
      nombrePersona: data.persona.nombre,
      telefono: data.persona.telefono,
      direccion: data.persona.direccion,
      resultado: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      mensaje: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

async function iniciarSesion(
  connection: oracledb.Connection,
  data: { rut: number; password: string }
) {
  return await connection.execute(
    "begin iniciar_sesion(:rut, :password, :resultado, :mensaje); end;",
    {
      rut: data.rut,
      password: data.password,
      resultado: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      mensaje: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}
//****************************************************************************************************************** */
async function haceUnPago(
  connection: oracledb.Connection,
  data: HaceUnPagoData
) {
  return await connection.execute(
    "begin hace_unpago(:id, :idArriendo, :valor, :tipo); END;",
    {
      id: data.id,
      idArriendo: data.idArriendo,
      valor: data.valor,
      tipo: data.tipo,
    }
  );
}

async function ingresarEmbarcacion(
  connection: oracledb.Connection,
  data: IngresarEmbarcacionData
) {
  return await connection.execute(
    "begin ingresar_embarcacion(:id, :tipo, :precio, :patente); END;",
    {
      id: data.id,
      tipo: data.tipo,
      precio: data.precio,
      patente: data.patente,
    }
  );
}

async function quitarEmbarcacion(
  connection: oracledb.Connection,
  data: { tipo: string; precio: number; patente: string }
) {
  return await connection.execute(
    "begin quitar_embarcacion(:tipo, :precio, :patente, :mensaje); END;",
    {
      tipo: data.tipo,
      precio: data.precio,
      patente: data.patente,
      mensaje: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

async function ingresoArriendoBarco(
  connection: oracledb.Connection,
  data: IngresoArriendoBarcoData
) {
  return await connection.execute(
    "begin ingresoarriendo_barco(:idEmbarcacion, :idAsistente, :idCliente, :idSeguro, :idPago, :lugarEntrega, :lugarRetiro, :fechaEntrega, :fechaRetiro, :horaEntrega, :horaRetiro); end;",
    {
      idEmbarcacion: data.idEmbarcacion,
      idAsistente: data.idAsistente,
      idCliente: data.idCliente,
      idSeguro: data.idSeguro,
      idPago: data.idPago,
      lugarEntrega: data.entrega.lugar,
      lugarRetiro: data.retiro.lugar,
      fechaEntrega: data.entrega.fecha,
      fechaRetiro: data.retiro.fecha,
      horaEntrega: data.entrega.hora,
      horaRetiro: data.retiro.hora,
    }
  );
}

async function crearEncuesta(
  connection: oracledb.Connection,
  data: CrearEncuestaData
) {
  return await connection.execute(
    "begin crear_encuesta(:idCliente, :idArriendo, :valoracion, :comentario); end;",
    {
      idCliente: data.idCliente,
      idArriendo: data.idArriendo,
      valoracion: data.valoracion,
      comenrario: data.comentario,
    }
  );
}

async function esAsistente(
  connection: oracledb.Connection,
  data: { rut: number; password: string }
) {
  return await connection.execute(
    "begin es_asistente(:rut, :password, :resultado, :mensaje); END;",
    {
      rut: data.rut,
      password: data.password,
      resultado: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      mensaje: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

/**********************************************************************************************************************/

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

app.post("/api/crear_usuario", async function(req, res) {
  let resultado = undefined;
  const data = req.body as CrearUsuarioData;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await crearUsuario(connection, data);

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

app.post("/api/iniciar_sesion", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { rut: number; password: string };
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await iniciarSesion(connection, data);

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

//---------------------------------------------------
//ARRIENDOS ACTIVOS
//---------------------------------------------------

async function arriendosActivos(
  connection: oracledb.Connection,
  data: { ASISTENTE_ID: number; ARRIENDOS_: string }
) {
  return await connection.execute(
    "begin ARRIENDOS_ACTIVOS(:ASISTENTE_ID, :ARRIENDOS_); END;",
    {
      ASISTENTE_ID: data.ASISTENTE_ID,
      ARRIENDOS_: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

//---------------------------------------------------
// FIN ARRIENDO
//---------------------------------------------------

async function finArriendos(
  connection: oracledb.Connection,
  data: { ID_ARRIENDO_ES: number; ESTADO_ES: number }
) {
  return await connection.execute(
    "begin FIN_ARRIENDO(:ID_ARRIENDO, :ESTADO, :MENSAJE_ES, :ESTADO_ES); END;",
    {
      ID_ARRIENDO: data.ID_ARRIENDO_ES,
      ESTADO: data.ESTADO_ES,
      MENSAJE_ES: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      ESTADO_ES: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    }
  );
}

//---------------------------------------------------
//ESTADO ARRIENDO
//---------------------------------------------------

async function estadoArriendo(
  connection: oracledb.Connection,
  data: { IDENTIFICADORARR: string }
) {
  return await connection.execute(
    "begin ESTADO_ARRIENDO(:IDENTIFICADORARR, :MENSAJE_VERIFICADOR); END;",
    {
      IDENTIFICADORARR_: data.IDENTIFICADORARR,
      MENSAJE_VERIFICADOR: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    }
  );
}

//---------------------------------------------------
// NUEVO ARRIENDO
//---------------------------------------------------

async function nuevoArriendo(
  connection: oracledb.Connection,
  data: {
    NEW_ID_ARRIENDO: number;
    NEW_RUT: number;
    NEW_ID_EMBARCACION: number;
    NEW_ID_ARRIENDO_DISPONIBLES: number;
    RESULTADO_OUT: boolean;
  }
) {
  return await connection.execute(
    "begin NUEVO_ARRIENDO(:NEW_ID_ARRIENDO, :NEW_RUT, : NEW_ID_EMBARCACION, :NEW_ID_ARRIENDO_DISPONIBLES, :RESULTADO_OUT ); END;",
    {
      NEW_ID_ARRIENDO: data.NEW_ID_ARRIENDO,
      NEW_RUT: data.NEW_RUT,
      NEW_ID_EMBARCACION: data.NEW_ID_EMBARCACION,
      NEW_ID_ARRIENDO_DISPONIBLES: data.NEW_ID_ARRIENDO_DISPONIBLES,
      RESULTADO_OUT: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    }
  );
}

// -------------------------------------------------

app.post("/api/estadoArriendo", async function(req, res) {
  let resultado = undefined;
  const data = req.body as { IDENTIFICADORARR: string };
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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

app.post("/api/ingresoArriendoBarco", async function(req, res) {
  let resultado = undefined;
  const data = req.body as IngresoArriendoBarcoData;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await ingresoArriendoBarco(connection, data);

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

app.post("/api/hace_unpago", async function(req, res) {
  let resultado = undefined;
  const data = req.body as HaceUnPagoData;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await haceUnPago(connection, data);

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
  const data = req.body as NuevoArriendoData;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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

app.post("/api/ingresar_embarcacion", async function(req, res) {
  let resultado = undefined;
  const data = req.body as IngresarEmbarcacionData;
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await ingresarEmbarcacion(connection, data);

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await finArriendos(connection, data);

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
  const data = req.body as { tipo: string; precio: number; patente: string };
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const rawBD = await quitarEmbarcacion(connection, data);

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
  let resultado: Resultado = {};
  try {
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
    connection = await oracledb.getConnection({
      user: usuario,
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

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
