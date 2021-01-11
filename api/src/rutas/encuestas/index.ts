import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla usuario
import { crear, lista } from "../../tablas/encuesta";
// tipos
import { CrearEncuestaData, Resultado, EntradaBD } from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const encuestas = (app: Express) => {
  app.post("/api/encuentas", async function(req, res) {
    let resultado = undefined;
    const data = JSON.parse(req.body) as CrearEncuestaData;
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

  app.get("/api/encuestas", async function(req, res) {
    let resultado: Resultado = {};
    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);

      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const encuesta: EntradaBD = {};

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
};

export default encuestas;
