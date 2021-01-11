import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla usuario
import { lista } from "../../tablas/seguros";
// tipos
import { Resultado, EntradaBD } from "../../typings/api";

let connection: db.Connection | undefined = undefined;

//FALTA EL INSERTAR EL SEGURO
///////////////////////////
const seguros = (app: Express) => {
  app.get("/api/seguros", async function(req, res) {
    let resultado: Resultado = {};
    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);
      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const seguro: EntradaBD = {};

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
};

export default seguros;
