import { Express } from "express";
// conexion oracle
import * as db from "../db";
// metodos tabla usuario
import { crear, iniciarSesion } from "../tablas/usuarios";
// tipos
import { CrearUsuarioData } from "../typings/api";

let connection: db.Connection | undefined = undefined;

const usuarios = (app: Express) => {
  // crear usuario
  app.post("/api/crear_usuario", async function(req, res) {
    let resultado = undefined;
    const data = req.body as CrearUsuarioData;
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
  app.post("/api/iniciar_sesion", async function(req, res) {
    let resultado = undefined;
    const data = req.body as { rut: number; password: string };
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
