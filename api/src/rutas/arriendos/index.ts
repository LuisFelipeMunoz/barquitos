import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla arriendo
import { buscar, crear } from "../../tablas/arriendos";
// tipos
import { BuscarArriendoData, CrearArriendoData } from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const arriendos = (app: Express) => {
  app.get("/api/arriendos/:id", async function(req, res) {
    let resultado = undefined;
    const data: BuscarArriendoData = { idArriendo: parseInt(req.params.id) };
    try {
      connection = await db.getConnection();

      const rawBD = await buscar(connection, data);

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

  app.post("/api/arriendos/", async function(req, res) {
    let resultado = undefined;
    const data = req.body as CrearArriendoData;
    try {
      connection = await db.getConnection();

      const rawBD = await crear(connection, data);

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
};
