"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.STRING = exports.NUMBER = exports.BIND_OUT = exports.OUT_FORMAT_OBJECT = void 0;
//CODIGO DE ACCESO A MI BASE DE DATOS, SE DEBE CAMBIAR EL NOMBRE Y CONTRASE;A DE MI BAE DE DATOS
//CONFIGURA CONEXION A LA BASE DE DATOS
const oracledb = require("oracledb");
const usuario = "BARCOS"; //NOMBRE
const mypw = "19389750";
exports.OUT_FORMAT_OBJECT = oracledb.OUT_FORMAT_OBJECT;
exports.BIND_OUT = oracledb.BIND_OUT;
exports.NUMBER = oracledb.NUMBER;
exports.STRING = oracledb.STRING;
exports.getConnection = () => {
    return oracledb.getConnection({
        user: usuario,
        password: mypw,
        connectString: "localhost/XE",
    });
};
//# sourceMappingURL=index.js.map