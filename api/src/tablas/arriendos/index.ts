// Todos los arriendo finalizados que tienen la encuesta pendiente por usuario
async function ListaEncuestasPendientes(
  connection: db.Connection,
  idCliente: number
) {
  return await connection.execute(
    "select * from arriendo left outer join encuesta on arriendo.id_arriendo = encuensta.id_arriendo where arriendo.id_cliente = :id and encuesta.id_encuesta = null",
    [idCliente],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

// CRUD ARRIENDO
async function listaArriendos(connection: db.Connection) {
  return await connection.execute("select * from arriendo", [], {
    // maxRows: 1,
    //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
  });
}

//una funcion que retorne todos los arriendos activos que estan asociados al asistente: recibe como parametro el id del asistente
async function listaArriendosActivos(
  connection: db.Connection,
  idAsistente: number
) {
  return await connection.execute(
    "select * from arriendo where arriendo.id_asistente = :id and arriendo.estado = 0;",
    [idAsistente],
    {
      // maxRows: 1,
      //, outFormat: db.OUT_FORMAT_OBJECT  // query result format
    }
  );
}

//---------------------------------------------------
//ARRIENDOS ACTIVOS
//---------------------------------------------------

async function arriendosActivos(
  connection: db.Connection,
  data: { ASISTENTE_ID: number; ARRIENDOS_: string }
) {
  return await connection.execute(
    "begin ARRIENDOS_ACTIVOS(:ASISTENTE_ID, :ARRIENDOS_); END;",
    {
      ASISTENTE_ID: data.ASISTENTE_ID,
      ARRIENDOS_: { type: db.STRING, dir: db.BIND_OUT },
    }
  );
}

//---------------------------------------------------
// FIN ARRIENDO
//---------------------------------------------------

async function finArriendo(
  connection: db.Connection,
  data: { ID_ARRIENDO_ES: number; ESTADO_ES: number }
) {
  return await connection.execute(
    "begin FIN_ARRIENDO(:ID_ARRIENDO, :ESTADO, :MENSAJE_ES, :ESTADO_ES); END;",
    {
      ID_ARRIENDO: data.ID_ARRIENDO_ES,
      ESTADO: data.ESTADO_ES,
      MENSAJE_ES: { type: db.STRING, dir: db.BIND_OUT },
      ESTADO_ES: { type: db.NUMBER, dir: db.BIND_OUT },
    }
  );
}

//---------------------------------------------------
// NUEVO ARRIENDO
//---------------------------------------------------

async function nuevoArriendo(
  connection: db.Connection,
  data: {
    NEW_ID_ARRIENDO: number;
    NEW_RUT: number;
    NEW_ID_EMBARCACION: number;
    NEW_ID_ARRIENDO_DISPONIBLES: number;
    RESULTADO_OUT: boolean;
  }
) {
  return await connection.execute(
    "begin NUEVO_ARRIENDO(:NEW_ID_ARRIENDO, :NEW_RUT, : NEW_ID_EMBARCACION, :NEW_ID_ARRIENDO_DISPONIBLES, :RESULTADO_OUT ); END;",
    {
      NEW_ID_ARRIENDO: data.NEW_ID_ARRIENDO,
      NEW_RUT: data.NEW_RUT,
      NEW_ID_EMBARCACION: data.NEW_ID_EMBARCACION,
      NEW_ID_ARRIENDO_DISPONIBLES: data.NEW_ID_ARRIENDO_DISPONIBLES,
      RESULTADO_OUT: { type: db.NUMBER, dir: db.BIND_OUT },
    }
  );
}
