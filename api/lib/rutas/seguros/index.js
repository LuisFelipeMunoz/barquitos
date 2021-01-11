"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla usuario
const seguros_1 = require("../../tablas/seguros");
let connection = undefined;
const seguros = (app) => {
    app.get("/api/seguros", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await seguros_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const seguro = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    seguro[nombreCampo] = val;
                });
                resultado[seguro.ID_SEGURO] = seguro;
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
exports.default = seguros;
//# sourceMappingURL=index.js.map