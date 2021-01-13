"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla usuario
const pagos_1 = require("../../tablas/pagos");
let connection = undefined;
const pagos = (app) => {
    app.post("/api/pagos/", async function (req, res) {
        let resultado = undefined;
        const data = req.body;
        try {
            connection = await db.getConnection();
            const rawBD = await pagos_1.crear(connection, data);
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
    app.post("/api/pagos/arriendo", async function (req, res) {
        let resultado = undefined;
        const data = req.body;
        console.log(data);
        try {
            connection = await db.getConnection();
            const rawBD = await pagos_1.crearArriendo(connection, data);
            console.log(rawBD);
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
    app.get("/api/pagos/", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await pagos_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const pago = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    pago[nombreCampo] = val;
                });
                resultado[pago.ID_PAGO] = pago;
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
exports.default = pagos;
//# sourceMappingURL=index.js.map