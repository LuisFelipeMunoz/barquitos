"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const history_api = require("connect-history-api-fallback");
const db = require("./db");
const login = require("./login");
let connection = undefined;
async function listaUsuarios(connection) {
    return await connection.execute("select * from usuario left outer join cliente on (cliente.id_usuario = usuario.id_usuario) left outer join asistente on (asistente.id_usuario = usuario.id_usuario)", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
async function crearUsuario(connection, data) {
    return await connection.execute("begin crear_usuario(:nombreUsuario, :password, :tipo, :rut, :nombrePersona, :telefono, :direccion, :mensaje, :resultado); end;", {
        nombreUsuario: data.usuario.nombre,
        password: data.usuario.password,
        tipo: data.usuario.tipo,
        rut: data.persona.rut,
        nombrePersona: data.persona.nombre,
        telefono: data.persona.telefono,
        direccion: data.persona.direccion,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
}
//****************************************************************************************************************** */
async function haceUnPago(connection, data) {
    return await connection.execute("begin hace_unpago(:id, :idArriendo, :valor, :tipo); END;", {
        id: data.id,
        idArriendo: data.idArriendo,
        valor: data.valor,
        tipo: data.tipo,
    });
}
async function ingresarEmbarcacion(connection, data) {
    return await connection.execute("begin ingresar_embarcacion(:id, :tipo, :precio, :patente); END;", {
        id: data.id,
        tipo: data.tipo,
        precio: data.precio,
        patente: data.patente,
    });
}
async function quitarEmbarcacion(connection, data) {
    return await connection.execute("begin quitar_embarcacion(:tipo, :precio, :patente, :mensaje); END;", {
        tipo: data.tipo,
        precio: data.precio,
        patente: data.patente,
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
}
async function ingresoArriendoBarco(connection, data) {
    return await connection.execute("begin ingresoarriendo_barco(:idEmbarcacion, :idAsistente, :idCliente, :idSeguro, :idPago, :lugarEntrega, :lugarRetiro, :fechaEntrega, :fechaRetiro, :horaEntrega, :horaRetiro); end;", {
        idEmbarcacion: data.idEmbarcacion,
        idAsistente: data.idAsistente,
        idCliente: data.idCliente,
        idSeguro: data.idSeguro,
        idPago: data.idPago,
        lugarEntrega: data.entrega.lugar,
        lugarRetiro: data.retiro.lugar,
        fechaEntrega: data.entrega.fecha,
        fechaRetiro: data.retiro.fecha,
        horaEntrega: data.entrega.hora,
        horaRetiro: data.retiro.hora,
    });
}
async function crearEncuesta(connection, data) {
    return await connection.execute("begin crear_encuesta(:idCliente, :idArriendo, :valoracion, :comentario); end;", {
        idCliente: data.idCliente,
        idArriendo: data.idArriendo,
        valoracion: data.valoracion,
        comenrario: data.comentario,
    });
}
async function esAsistente(connection, data) {
    return await connection.execute("begin es_asistente(:rut, :password, :resultado, :mensaje); END;", {
        rut: data.rut,
        password: data.password,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
        mensaje: { type: db.STRING, dir: db.BIND_OUT },
    });
}
/**********************************************************************************************************************/
// Una funcion que enliste todos los barcos que tiene arriendos disponibles
async function listaBarcosArriendoDisponibles(connection) {
    return await connection.execute("select * from embarcacion inner join arriendos_disponibles.id_embarcacion on embarcacion.id_embarcacion = arriendos_disponibles.id_embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// Una funcion que enliste todos los arriendos disponibles de un barco: recibe como parametro el id del barco
async function listaArriendosDisponiblesBarco(connection, idEmbarcacion) {
    return await connection.execute("select * from arriendos_disponibles where id_embarcacion = :id", [idEmbarcacion], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
async function ListaEncuestasPendientes(connection, idCliente) {
    return await connection.execute("select * from arriendo left outer join encuesta on arriendo.id_arriendo = encuensta.id_arriendo where arriendo.id_cliente = :id and encuesta.id_encuesta = null", [idCliente], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// // CRUD EMBARCACIONES
async function listaEmbarcaciones(connection) {
    return await connection.execute("select * from embarcacion", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD SEGUROS
async function listaSeguros(connection) {
    return await connection.execute("select * from seguro", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ARRIENDO
async function listaArriendos(connection) {
    return await connection.execute("select * from arriendo", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD PAGO
async function listaPagos(connection) {
    return await connection.execute("select * from pago", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ENCUESTA
async function listaEncuestas(connection) {
    return await connection.execute("select * from encuesta", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
// CRUD ARRIENDOS DISPONIBLES
async function listaArriendoDisponibles(connection) {
    return await connection.execute("select * from arriendos_disponibles", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    });
}
//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
async function listaArriendosActivos(connection, idAsistente) {
    return await connection.execute("select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;", [idAsistente], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
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
app.post("/api/crear_usuario", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await crearUsuario(connection, data);
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
app.post("/api/iniciar_sesion", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await login.iniciarSesion(connection, data);
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
//---------------------------------------------------
//ARRIENDOS ACTIVOS
//---------------------------------------------------
async function arriendosActivos(connection, data) {
    return await connection.execute("begin ARRIENDOS_ACTIVOS(:ASISTENTE_ID, :ARRIENDOS_); END;", {
        ASISTENTE_ID: data.ASISTENTE_ID,
        ARRIENDOS_: { type: db.STRING, dir: db.BIND_OUT },
    });
}
//---------------------------------------------------
// FIN ARRIENDO
//---------------------------------------------------
async function finArriendo(connection, data) {
    return await connection.execute("begin FIN_ARRIENDO(:ID_ARRIENDO, :ESTADO, :MENSAJE_ES, :ESTADO_ES); END;", {
        ID_ARRIENDO: data.ID_ARRIENDO_ES,
        ESTADO: data.ESTADO_ES,
        MENSAJE_ES: { type: db.STRING, dir: db.BIND_OUT },
        ESTADO_ES: { type: db.NUMBER, dir: db.BIND_OUT },
    });
}
//---------------------------------------------------
//ESTADO ARRIENDO
//---------------------------------------------------
async function estadoArriendo(connection, data) {
    return await connection.execute("begin :resultado := ESTADO_ARRIENDO(:idArriendo); END;", {
        idArriendo: data.IDENTIFICADORARR,
        resultado: { type: db.STRING, dir: db.BIND_OUT },
    });
}
//---------------------------------------------------
// NUEVO ARRIENDO
//---------------------------------------------------
async function nuevoArriendo(connection, data) {
    return await connection.execute("begin NUEVO_ARRIENDO(:NEW_ID_ARRIENDO, :NEW_RUT, : NEW_ID_EMBARCACION, :NEW_ID_ARRIENDO_DISPONIBLES, :RESULTADO_OUT ); END;", {
        NEW_ID_ARRIENDO: data.NEW_ID_ARRIENDO,
        NEW_RUT: data.NEW_RUT,
        NEW_ID_EMBARCACION: data.NEW_ID_EMBARCACION,
        NEW_ID_ARRIENDO_DISPONIBLES: data.NEW_ID_ARRIENDO_DISPONIBLES,
        RESULTADO_OUT: { type: db.NUMBER, dir: db.BIND_OUT },
    });
}
// -------------------------------------------------
app.post("/api/estadoArriendo", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await estadoArriendo(connection, data);
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
app.post("/api/ingresoArriendoBarco", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await ingresoArriendoBarco(connection, data);
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
app.post("/api/hace_unpago", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await haceUnPago(connection, data);
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
// -------------------------------------------------
app.post("/api/nuevoArriendo", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await nuevoArriendo(connection, data);
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
app.post("/api/crearEncuesta", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await crearEncuesta(connection, data);
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
// -------------------------------------------------
app.post("/api/arriendosActivos", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await arriendosActivos(connection, data);
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
app.post("/api/ingresar_embarcacion", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await ingresarEmbarcacion(connection, data);
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
// -------------------------------------------------
app.post("/api/finArriendos", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await finArriendo(connection, data);
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
app.post("/api/quitar_embarcacion", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await quitarEmbarcacion(connection, data);
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
app.post("/api/es_asistente", async function (req, res) {
    let resultado = undefined;
    const data = req.body;
    try {
        connection = await db.getConnection();
        const rawBD = await esAsistente(connection, data);
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
// -------------------------------------------------
app.get("/api/embarcaciones/arriendos_disponibles", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaBarcosArriendoDisponibles(connection);
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
app.get("/api/arriendos_disponibles/embarcacion/:id", async function (req, res) {
    var _a;
    let resultado = {};
    const idEmbarcacion = parseInt(req.params.id);
    try {
        connection = await db.getConnection();
        const rawBD = await listaArriendosDisponiblesBarco(connection, idEmbarcacion);
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
app.get("/api/arriendos/encuestas/pendientes/cliente/:id", async function (req, res) {
    var _a;
    let resultado = {};
    const idCliente = parseInt(req.params.id);
    try {
        connection = await db.getConnection();
        const rawBD = await ListaEncuestasPendientes(connection, idCliente);
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
app.get("/api/arriendos/activos/asistente/:id", async function (req, res) {
    var _a;
    let resultado = {};
    const idAsistente = parseInt(req.params.id);
    try {
        connection = await db.getConnection();
        const rawBD = await listaArriendosActivos(connection, idAsistente);
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
app.get("/api/usuarios", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
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
        connection = await db.getConnection();
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
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaSeguros(connection);
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
app.get("/api/arriendos", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaArriendos(connection);
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
app.get("/api/pagos", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaPagos(connection);
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
app.get("/api/encuestas", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaEncuestas(connection);
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
app.get("/api/arriendoDisponibles", async function (req, res) {
    var _a;
    let resultado = {};
    try {
        connection = await db.getConnection();
        const rawBD = await listaArriendoDisponibles(connection);
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
app.listen(port, () => {
    console.log(`Example app listening at port:${port}`);
});
//# sourceMappingURL=index.js.map