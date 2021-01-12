//CODIGO DE ACCESO A MI BASE DE DATOS, SE DEBE CAMBIAR EL NOMBRE Y CONTRASE;A DE MI BAE DE DATOS
//CONFIGURA CONEXION A LA BASE DE DATOS
import * as oracledb from "oracledb";

const usuario = "BARCOS"; //NOMBRE
const mypw = "19389750";

export type Connection = oracledb.Connection;

export const OUT_FORMAT_OBJECT = oracledb.OUT_FORMAT_OBJECT;

export const BIND_OUT = oracledb.BIND_OUT;

export const NUMBER = oracledb.NUMBER;

export const STRING = oracledb.STRING;

export const getConnection = () => {
  return oracledb.getConnection({
    user: usuario,
    password: mypw,
    connectString: "localhost/XE",
  });
};
