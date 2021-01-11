"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lista = void 0;
// CRUD SEGUROS
exports.lista = async (connection) => {
    return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map