"use strict";
//RUTAS HTML
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla arriendo
const arriendos_1 = require("../../tablas/arriendos");
let connection = undefined;
const arriendos = (app) => {
    app.get("/api/arriendos", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const arriendo = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    arriendo[nombreCampo] = val;
                });
                resultado[arriendo.ID_ARRIENDO] = arriendo;
            });
        }
        catch (err) {
            console.error(err);
            resultado[0] = { error: err };
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado[0] = { error: err };
                }
            }
        }
        res.send(resultado);
    });
    app.get("/api/arriendos/:id", async function (req, res) {
        let resultado = undefined;
        const data = { idArriendo: parseInt(req.params.id) };
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.buscar(connection, data);
            resultado = rawBD;
        }
        catch (err) {
            console.error(err);
            resultado = err;
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado = err;
                }
            }
        }
        res.send(resultado);
    });
    app.get("/api/arriendos/pendientes/asistente/:id", async function (req, res) {
        var _a;
        let resultado = {};
        const data = {
            idAsistente: parseInt(req.params.id),
        };
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.listaPendientesAsistente(connection, data);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const arriendos = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    if (val) {
                        arriendos[nombreCampo] = val;
                    }
                });
                resultado[arriendos.ID_ARRIENDO] = arriendos;
            });
        }
        catch (err) {
            console.error(err);
            resultado = err;
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado = err;
                }
            }
        }
        res.send(resultado);
    });
    app.get("/api/arriendos/encuestas/pendientes/cliente/:id", async function (req, res) {
        var _a;
        let resultado = {};
        const data = {
            idCliente: parseInt(req.params.id),
        };
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.listaEncuestasPendientesCliente(connection, data);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const arriendos = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    if (val) {
                        arriendos[nombreCampo] = val;
                    }
                });
                resultado[arriendos.ID_ARRIENDO] = arriendos;
            });
        }
        catch (err) {
            console.error(err);
            resultado = err;
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado = err;
                }
            }
        }
        res.send(resultado);
    });
    app.post("/api/arriendos/", async function (req, res) {
        let resultado = undefined;
        const data = JSON.parse(req.body);
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.crear(connection, data);
            resultado = rawBD;
        }
        catch (err) {
            console.error(err);
            resultado = err;
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado = err;
                }
            }
        }
        res.send(resultado);
    });
    app.post("/api/arriendos/finalizar", async function (req, res) {
        let resultado = undefined;
        const data = req.body;
        try {
            connection = await db.getConnection();
            const rawBD = await arriendos_1.finalizar(connection, data);
            resultado = rawBD;
        }
        catch (err) {
            console.error(err);
            resultado = err;
        }
        finally {
            if (connection) {
                try {
                    await connection.close();
                }
                catch (err) {
                    console.error(err);
                    resultado = err;
                }
            }
        }
        res.send(resultado);
    });
};
exports.default = arriendos;
//# sourceMappingURL=index.js.map