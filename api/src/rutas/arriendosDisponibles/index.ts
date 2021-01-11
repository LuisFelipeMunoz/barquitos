import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla arriendo
import { lista, ListaEmbarcacion } from "../../tablas/arriendosDisponibles";
// tipos
import {
  EntradaBD,
  ListaArriendosDisponiblesEmbarcacionData,
  Resultado,
} from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const arriendosDisponibles = (app: Express) => {
  app.get("/api/arriendoDisponibles", async function(req, res) {
    let resultado: Resultado = {};
    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);
      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const arriendos_disponibles: EntradaBD = {};

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

  app.get("/api/arriendos_disponibles/embarcacion/:id", async function(
    req,
    res
  ) {
    let resultado: Resultado = {};
    const data: ListaArriendosDisponiblesEmbarcacionData = {
      idEmbarcacion: parseInt(req.params.id),
    };
    try {
      connection = await db.getConnection();

      const rawBD = await ListaEmbarcacion(connection, data);

      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const arriendosDisponibles: EntradaBD = {};

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
};

export default arriendosDisponibles;
