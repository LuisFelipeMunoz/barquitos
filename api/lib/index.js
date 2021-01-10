"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb = require("oracledb");
const express = require("express");
const history_api = require("connect-history-api-fallback");
let connection = undefined;
const usuario = "usuario";
const mypw = "123456";
async function listaUsuarios(connection) {
    return await connection.execute("select * from usuario left outer join cliente on (cliente.id_usuario = usuario.id_usuario) left outer join asistente on (asistente.id_usuario = usuario.id_usuario)", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// Una funcion que enliste todos los barcos que tiene arriendos disponibles
async function listaBarcosArriendoDisponibles(connection) {
    return await connection.execute("select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
async function listaArriendosDisponiblesBarco(connection, idEmbarcacion) {
    return await connection.execute("select * from arriendos_disponibles where id_embarcacion = :id", [idEmbarcacion], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
async function ListaEncuestasPendientes(connection, idCliente) {
    return await connection.execute("select * from arriendo a left outer join encuesta e on a.id_arriendo = e.id_arriendo where e.id_cliente = :id", [idCliente], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// // CRUD EMBARCACIONES
async function listaEmbarcaciones(connection) {
    return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD SEGUROS
async function listaSeguros(connection) {
    return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ARRIENDO
async function listaArriendos(connection) {
    return await connection.execute("select * from arriendo", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD PAGO
async function listaPagos(connection) {
    return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ENCUESTA
async function listaEncuestas(connection) {
    return await connection.execute("select * from encuesta", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ARRIENDOS DISPONIBLES
async function listaArriendoDisponibles(connection) {
    return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
async function listaArriendosActivos(connection, idAsistente) {
    return await connection.execute("select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;", [idAsistente], {
    // maxRows: 1,
    //, outFormat: oracledb.OUT_FORMAT_OBJECT  // query result format
    });
}
const history = history_api({
    disableDotRule: true,
    verbose: true,
});
const app = express();
const port = 8000;
const staticFileMiddleware = express.static("dist");
app.use(staticFileMiddleware);
app.use((req, res, next) => {
    if (req.path.includes("api/")) {
        next();
    }
    else {
        history(req, res, next);
    }
});
// login
app.get("/api/iniciar_sesion", function (req, res) {
    res.send("OK");
});
app.get("/api/embarcaciones/arriendos_disponibles", async function (req, res) {
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaBarcosArriendoDisponibles(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/arriendos_disponibles/embarcacion/:id", async function (req, res) {
    let resultado = undefined;
    const idEmbarcacion = parseInt(req.params.id);
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaArriendosDisponiblesBarco(connection, idEmbarcacion);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
    let resultado = undefined;
    const idCliente = parseInt(req.params.id);
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await ListaEncuestasPendientes(connection, idCliente);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/arriendos/activos/asistente/:id", async function (req, res) {
    let resultado = undefined;
    const idAsistente = parseInt(req.params.id);
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaArriendosActivos(connection, idAsistente);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/usuarios", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        const rawBD = await listaUsuarios(connection);
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
app.get("/api/embarcaciones", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        const rawBD = await listaEmbarcaciones(connection);
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
app.get("/api/seguros", async function (req, res) {
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaSeguros(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/arriendos", async function (req, res) {
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaArriendos(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/pagos", async function (req, res) {
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaPagos(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaEncuestas(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.get("/api/arriendoDisponibles", async function (req, res) {
    let resultado = undefined;
    try {
        connection = await oracledb.getConnection({
            user: usuario,
            password: mypw,
            connectString: "localhost/XEPDB1",
        });
        resultado = await listaArriendoDisponibles(connection);
        console.log(resultado.metaData);
        console.log(resultado.rows);
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
app.listen(port, () => {
    console.log(`Example app listening at port:${port}`);
});
//# sourceMappingURL=index.js.map