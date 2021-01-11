import { Express } from "express";
// conexion oracle
import * as db from "../../db";
// metodos tabla usuario
import { crear, iniciarSesion, lista } from "../../tablas/usuarios";
// tipos
import {
  CrearUsuarioData,
  Resultado,
  EntradaBD,
  IniciarSesionData,
} from "../../typings/api";

let connection: db.Connection | undefined = undefined;

const usuarios = (app: Express) => {
  // lista usuarios
  app.get("/api/usuarios", async function(req, res) {
    let resultado: Resultado = {};
    try {
      connection = await db.getConnection();

      const rawBD = await lista(connection);

      rawBD.rows?.forEach((item) => {
        const datos = item as Array<any>;

        const usuario: EntradaBD = {};

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
  // crear usuario
  app.post("/api/usuarios", async function(req, res) {
    let resultado = undefined;
    const data = JSON.parse(req.body) as CrearUsuarioData;
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
  // iniciar sesion usuario
  app.post("/api/usuarios/iniciar_sesion", async function(req, res) {
    let resultado = undefined;
    const data = req.body as IniciarSesionData;
    try {
      connection = await db.getConnection();

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
};

export default usuarios;
