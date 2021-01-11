"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = exports.crear = void 0;
exports.crear = async (connection, data) => {
    return await connection.execute("begin hace_unpago(:id, :idArriendo, :valor, :tipo); END;", {
        id: data.id,
        idArriendo: data.idArriendo,
        valor: data.valor,
        tipo: data.tipo,
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