import * as oracledb from "oracledb";
import * as express from "express";
import * as history_api from "connect-history-api-fallback";

let connection: oracledb.Connection | undefined = undefined;

const mypw = "123456";

// // Una funcion que enliste todos los barcos que tiene arriendos disponibles
// async function listaBarcosArriendoDisponibles(connection: oracledb.Connection) {
//   return await connection.execute(
//     "select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion",
//     [],
//     {
//       // maxRows: 1,
//       //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
//     }
//   );
// }

// // Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
// async function listaArriendosDisponiblesBarco(
//   connection: oracledb.Connection,
//   idEmbarcacion: number
// ) {
//   return await connection.execute(
//     "select * from arriendos_disponibles where id_embarcacion = :id",
//     [idEmbarcacion],
//     {
//       // maxRows: 1,
//       //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
//     }
//   );
// }

// // Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
// async function ListaEncuestasPendientes(
//   connection: oracledb.Connection,
//   idCliente: number
// ) {
//   return await connection.execute(
//     "select * from arriendo a left outer join encuesta e on a.id_arriendo = e.id_arriendo where e.id_cliente = :id",
//     [idCliente],
//     {
//       // maxRows: 1,
//       //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
//     }
//   );
// }

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

// //una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
// async function listaArriendosActivos(
//   connection: oracledb.Connection,
//   idAsistente: number
// ) {
//   return await connection.execute(
//     "select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;",
//     [idAsistente],
//     {
//       // maxRows: 1,
//       //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
//     }
//   );
// }

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

app.get("/api/iniciar_sesion", function(req, res) {
  res.send("OK");
});

app.get("/api/embarcaciones", async function(req, res) {
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: "usuario",
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    resultado = await listaEmbarcaciones(connection);

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

app.get("/api/seguros", async function(req, res) {
  let resultado = undefined;
  try {
    connection = await oracledb.getConnection({
      user: "usuario",
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
      user: "usuario",
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
      user: "usuario",
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
      user: "usuario",
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
      user: "usuario",
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
