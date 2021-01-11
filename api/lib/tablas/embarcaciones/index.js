"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaArriendosDisponibles = exports.lista = exports.quitar = exports.crear = void 0;
const db = require("../../db");
exports.crear = async (connection, data) => {
    return await connection.execute("begin crear_embarcacion(:idAsistente, :tipo, :precio, :patente, :mensaje, :resultado); end;", {
        idAsistente: data.idAsistente,
        tipo: data.tipo,
        precio: data.precio,
        patente: data.patente,
    });
};
exports.quitar = async (connection, data) => {
    return await connection.execute("begin quitar_embarcacion(:idEmbarcacion, :mensaje); END;", {
        idEmbarcacion: data.idEmbarcacion,
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
};
exports.lista = async (connection) => {
    return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
// Una funcion que enliste todos los barcos que tiene arriendos disponibles
exports.listaArriendosDisponibles = async (connection) => {
    return await connection.execute("select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map