import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla usuario
import { crear, lista } from "../../tablas/pagos";
// tipos
import { CrearPagoData, Resultado, EntradaBD } from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const pagos = (app: Express) => {
  app.post("/api/pagos/", async function(req, res) {
    let resultado = undefined;
    const data = JSON.parse(req.body) as CrearPagoData;
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

  app.get("/api/pagos/", async function(req, res) {
    let resultado: Resultado = {};
    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);

      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const pago: EntradaBD = {};

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
};

export default pagos;
