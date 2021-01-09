import * as oracledb from "oracledb";
import * as express from "express";
import * as history_api from "connect-history-api-fallback";

const mypw = "isicaro";

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "hr",
      password: mypw,
      connectString: "localhost/XEPDB1",
    });

    const result = await connection.execute("SELECT * FROM embarcaciones", [], {
      // maxRows: 1,
      //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
    console.log(result.metaData);
    console.log(result.rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

// Una funcion que enliste todos los barcos que tiene arriendos disponibles
async function listaBarcosArriendoDisponibles(connection: oracledb.Connection) {
  return await connection.execute(
    "select * from embarcaciones inner join arriendos_disponibles.id_embarcacion on embarcaciones.id_embarcacion = arriendos_disponibles.id_embarcacion",
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

run();

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

app.listen(port, () => {
  console.log(`Example app listening at port:${port}`);
});
