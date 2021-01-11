"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iniciarSesion = exports.crear = exports.lista = void 0;
const db = require("../../db");
exports.lista = async (connection) => {
    return await connection.execute("select * from usuario left outer join cliente on (cliente.id_usuario = usuario.id_usuario) left outer join asistente on (asistente.id_usuario = usuario.id_usuario)", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
exports.crear = async (connection, data) => {
    return await connection.execute("begin crear_usuario(:nombreUsuario, :password, :tipo, :rut, :nombrePersona, :telefono, :direccion, :mensaje, :resultado); end;", {
        nombreUsuario: data.usuario.nombre,
        password: data.usuario.password,
        tipo: data.usuario.tipo,
        rut: data.persona.rut,
        nombrePersona: data.persona.nombre,
        telefono: data.persona.telefono,
        direccion: data.persona.direccion,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
};
exports.iniciarSesion = async (connection, data) => {
    return await connection.execute("begin iniciar_sesion(:nombre, :password, :resultado, :mensaje); end;", {
        nombre: data.nombre,
        password: data.password,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
};
//# sourceMappingURL=index.js.map