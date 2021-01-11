"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = exports.crear = void 0;
exports.crear = async (connection, data) => {
    return await connection.execute("begin crear_encuesta(:idCliente, :idArriendo, :valoracion, :comentario); end;", {
        idCliente: data.idCliente,
        idArriendo: data.idArriendo,
        valoracion: data.valoracion,
        comenrario: data.comentario,
    });
};
// CRUD ENCUESTA
exports.lista = async (connection) => {
    return await connection.execute("select * from encuesta", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map