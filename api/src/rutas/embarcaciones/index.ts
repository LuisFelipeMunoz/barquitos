import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla arriendo
import {
  lista,
  crear,
  quitar,
  listaArriendosDisponibles,
} from "../../tablas/embarcaciones";
// tipos
import {
  EntradaBD,
  Resultado,
  CrearEmbarcacionData,
  QuitarEmbarcacionData,
} from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const embarcaciones = (app: Express) => {
  app.get("/api/embarcaciones", async function(req, res) {
    let resultado: Resultado = {};

    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);

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

  app.post("/api/embarcaciones", async function(req, res) {
    let resultado = undefined;
    const data = req.body as CrearEmbarcacionData;
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

  app.delete("/api/embarcacion/:id", async function(req, res) {
    let resultado = undefined;
    const data: QuitarEmbarcacionData = {
      idEmbarcacion: parseInt(req.params.id),
    };
    try {
      connection = await db.getConnection();

      const rawBD = await quitar(connection, data);

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

      const rawBD = await listaArriendosDisponibles(connection);

      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const embarcacion: EntradaBD = {};

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
};

export default embarcaciones;
