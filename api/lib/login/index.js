"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarSesion = void 0;
const db = require("@/db");
exports.iniciarSesion = async (connection, data) => {
    return await connection.execute("begin iniciar_sesion(:rut, :password, :resultado, :mensaje); end;", {
        rut: data.rut,
        password: data.password,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
};
//# sourceMappingURL=index.js.map