"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listaPendientesAsistente = exports.listaEncuestasPendientesCliente = exports.finalizar = exports.buscar = exports.crear = exports.lista = void 0;
const db = require("../../db");
exports.lista = async (connection) => {
    return await connection.execute("select * from arriendo", []);
};
exports.crear = async (connection, data) => {
    return await connection.execute("begin crear_arriendo(:idCliente, :idEmbarcacion, :idArriendoDisponible, :idPago, :mensaje, :resultado ); end;", {
        idCliente: data.idCliente,
        idEmbarcacion: data.idEmbarcacion,
        idArriendoDisponible: data.idArriendoDisponible,
        idPago: data.idPago,
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
        resultado: { type: db.STRING, dir: db.BIND_OUT },
    });
};
exports.buscar = async (connection, data) => {
    return await connection.execute("select * from arriendo left outer join cliente on arriendo.id_cliente = cliente.id_cliente left outer join embarcacion on arriendo.id_embarcacion = embarcacion.id_embarcacion left outer join asistente on arriendo.id_asistente = asistente.id_asistente left outer join seguro on arriendo.id_seguro = seguro.id_seguro left outer join pago on arriendo.id_pago = pago.id_pago where arriendo.id_arriendo = :idArriendo", [data.idArriendo]);
};
exports.finalizar = async (connection, data) => {
    return await connection.execute("begin fin_arriendo(:idArriendo, :mensaje, :resultado); END;", {
        idArriendo: data.idArriendo,
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
        resultado: { type: db.NUMBER, dir: db.BIND_OUT },
    });
};
// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
exports.listaEncuestasPendientesCliente = async (connection, data) => {
    return await connection.execute("select * from arriendo left outer join encuesta on arriendo.id_arriendo = encuensta.id_arriendo where arriendo.id_cliente = :id and encuesta.id_encuesta = null", [data.idCliente]);
};
//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
exports.listaPendientesAsistente = async (connection, data) => {
    return await connection.execute("select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;", [data.idAsistente], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
};
//# sourceMappingURL=index.js.map