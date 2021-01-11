"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListaEmbarcacion = exports.lista = void 0;
exports.lista = async (connection) => {
    return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
exports.ListaEmbarcacion = async (connection, data) => {
    return await connection.execute("select * from arriendos_disponibles where id_embarcacion = :id", [data.idEmbarcacion], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map