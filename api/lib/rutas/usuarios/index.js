"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// conexion oracle
const db = require("../../db");
// metodos tabla usuario
const usuarios_1 = require("../../tablas/usuarios");
let connection = undefined;
const usuarios = (app) => {
    // lista usuarios
    app.get("/api/usuarios", async function (req, res) {
        var _a;
        let resultado = {};
        try {
            connection = await db.getConnection();
            const rawBD = await usuarios_1.lista(connection);
            (_a = rawBD.rows) === null || _a === void 0 ? void 0 : _a.forEach((item) => {
                const datos = item;
                const usuario = {};
                datos.forEach((val, index) => {
                    const nombreCampo = rawBD.metaData
                        ? rawBD.metaData[index].name
                        : "COL" + index.toString();
                    if (val) {
                        usuario[nombreCampo] = val;
                    }
                });
                resultado[usuario.ID_USUARIO] = usuario;
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
    // crear usuario
    app.post("/api/usuarios", async function (req, res) {
        let resultado = undefined;
        const data = JSON.parse(req.body);
        try {
            connection = await db.getConnection();
            const rawBD = await usuarios_1.crear(connection, data);
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
    // iniciar sesion usuario
    app.post("/api/usuarios/iniciar_sesion", async function (req, res) {
        let resultado = undefined;
        const data = JSON.parse(req.body);
        try {
            connection = await db.getConnection();
            const rawBD = await usuarios_1.iniciarSesion(connection, data);
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
exports.default = usuarios;
//# sourceMappingURL=index.js.map