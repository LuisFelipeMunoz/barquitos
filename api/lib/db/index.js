"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = exports.STRING = exports.NUMBER = exports.BIND_OUT = exports.OUT_FORMAT_OBJECT = void 0;
const oracledb = require("oracledb");
const usuario = "usuario";
const mypw = "123456";
exports.OUT_FORMAT_OBJECT = oracledb.OUT_FORMAT_OBJECT;
exports.BIND_OUT = oracledb.BIND_OUT;
exports.NUMBER = oracledb.NUMBER;
exports.STRING = oracledb.STRING;
exports.getConnection = () => {
    return oracledb.getConnection({
        user: usuario,
        password: mypw,
        connectString: "localhost/XEPDB1",
    });
};
//# sourceMappingURL=index.js.map