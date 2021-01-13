"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = exports.crearArriendo = exports.crear = void 0;
const db = require("../../db");
exports.crear = async (connection, data) => {
    return await connection.execute("begin hace_unpago(:id, :idArriendo, :valor, :tipo); END;", {
        id: data.id,
        idArriendo: data.idArriendo,
        valor: data.valor,
        tipo: data.tipo,
    });
};
exports.crearArriendo = async (connection, data) => {
    return await connection.execute("begin crear_pago_arriendo(:idEmbarcacion, :tipo, :resultado, :mensaje); END;", {
        idEmbarcacion: data.idEmbarcacion,
        tipo: data.tipo,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
};
// CRUD PAGO
exports.lista = async (connection) => {
    return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map