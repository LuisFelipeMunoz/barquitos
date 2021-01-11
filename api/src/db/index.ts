import * as oracledb from "oracledb";

const usuario = "usuario";
const mypw = "123456";

export type Connection = oracledb.Connection;

export const OUT_FORMAT_OBJECT = oracledb.OUT_FORMAT_OBJECT;

export const BIND_OUT = oracledb.BIND_OUT;

export const NUMBER = oracledb.NUMBER;

export const STRING = oracledb.STRING;

export const getConnection = () => {
  return oracledb.getConnection({
    user: usuario,
    password: mypw,
    connectString: "localhost/XEPDB1",
  });
};
