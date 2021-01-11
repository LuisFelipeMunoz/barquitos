"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla arriendo
const arriendosDisponibles_1 = require("../../tablas/arriendosDisponibles");
let connection = undefined;
const arriendosDisponibles = (app) => {
    app.get("/api/arriendoDisponibles", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await arriendosDisponibles_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const arriendos_disponibles = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    arriendos_disponibles[nombreCampo] = val;
                });
                resultado[arriendos_disponibles.ID_arriendo_disponibles] = arriendos_disponibles;
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
    app.get("/api/arriendos_disponibles/embarcacion/:id", async function (req, res) {
        var _a;
        let resultado = {};
        const data = {
            idEmbarcacion: parseInt(req.params.id),
        };
        try {
            connection = await db.getConnection();
            const rawBD = await arriendosDisponibles_1.ListaEmbarcacion(connection, data);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const arriendosDisponibles = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    if (val) {
                        arriendosDisponibles[nombreCampo] = val;
                    }
                });
                resultado[arriendosDisponibles.ID_ARRIENDO_DISPONIBLES] = arriendosDisponibles;
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
exports.default = arriendosDisponibles;
//# sourceMappingURL=index.js.map