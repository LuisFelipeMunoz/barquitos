"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla usuario
const encuesta_1 = require("../../tablas/encuesta");
let connection = undefined;
const encuestas = (app) => {
    app.post("/api/encuentas", async function (req, res) {
        let resultado = undefined;
        const data = JSON.parse(req.body);
        try {
            connection = await db.getConnection();
            const rawBD = await encuesta_1.crear(connection, data);
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
    app.get("/api/encuestas", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await encuesta_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const encuesta = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    encuesta[nombreCampo] = val;
                });
                resultado[encuesta.ID_ENCUESTA] = encuesta;
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
};
exports.default = encuestas;
//# sourceMappingURL=index.js.map