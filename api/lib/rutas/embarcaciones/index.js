"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla arriendo
const embarcaciones_1 = require("../../tablas/embarcaciones");
let connection = undefined;
const embarcaciones = (app) => {
    app.get("/api/embarcaciones", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await embarcaciones_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const embarcacion = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    embarcacion[nombreCampo] = val;
                });
                resultado[embarcacion.ID_EMBARCACION] = embarcacion;
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
    app.post("/api/embarcaciones", async function (req, res) {
        let resultado = undefined;
        const data = req.body;
        try {
            connection = await db.getConnection();
            const rawBD = await embarcaciones_1.crear(connection, data);
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
    app.delete("/api/embarcacion/:id", async function (req, res) {
        let resultado = undefined;
        const data = {
            idEmbarcacion: parseInt(req.params.id),
        };
        try {
            connection = await db.getConnection();
            const rawBD = await embarcaciones_1.quitar(connection, data);
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
    app.get("/api/embarcaciones/arriendos_disponibles", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await embarcaciones_1.listaArriendosDisponibles(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const embarcacion = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    if (val) {
                        embarcacion[nombreCampo] = val;
                    }
                });
                resultado[embarcacion.ID_EMBARCACION] = embarcacion;
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
};
exports.default = embarcaciones;
//# sourceMappingURL=index.js.map