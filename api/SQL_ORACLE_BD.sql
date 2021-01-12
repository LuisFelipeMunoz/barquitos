----------------------------------------------------------------
--DROP--
----------------------------------------------------------------

DROP TABLE ENCUESTA;
DROP TABLE ARRIENDOS_DISPONIBLES;
DROP TABLE PAGO;
DROP TABLE ARRIENDO;
DROP TABLE SEGURO;
DROP TABLE EMBARCACION;
DROP TABLE CLIENTE;
DROP TABLE ASISTENTE;
DROP TABLE USUARIO;

DROP SEQUENCE CREATE_ID_USUARIO;
DROP SEQUENCE CREATE_ID_ASISTENTE;
DROP SEQUENCE CREATE_ID_EMBARCACION;
DROP SEQUENCE CREATE_ID_SEGURO;
DROP SEQUENCE CREATE_ID_ARRIENDO;
DROP SEQUENCE CREATE_ID_PAGO;
DROP SEQUENCE CREATE_ID_ENCUESTA;
DROP SEQUENCE CREATE_ID_ARRIENDOS_D;

DROP PROCEDURE CREAR_USUARIO;
DROP PROCEDURE INICIAR_SESION;
DROP PROCEDURE CREAR_ARRIENDO;
DROP PROCEDURE CREAR_ENCUESTA;
DROP PROCEDURE CREAR_PAGO;
DROP PROCEDURE CREAR_EMBARCACION;
DROP PROCEDURE QUITAR_EMBARCACION;
DROP PROCEDURE FIN_ARRIENDO;
DROP PROCEDURE CREAR_ARRIENDO;

DROP TRIGGER FORMATEAR_DATOS_CLIENTE;

DROP FUNCTION VERIFICAR_CLIENTE;
DROP FUNCTION OBTENER_CONTRASENA;

----------------------------------------------------------------
--TABLAS--
----------------------------------------------------------------

CREATE TABLE USUARIO (
ID_USUARIO      NUMBER NOT NULL, 
NOMBRE_USUARIO  VARCHAR(20) UNIQUE NOT NULL,
TIPO            VARCHAR(20),
CONTRASENIA     VARCHAR(20) UNIQUE NOT NULL,
PRIMARY KEY (ID_USUARIO)
);

CREATE TABLE CLIENTE (
RUT             NUMBER NOT NULL,
ID_USUARIO      NUMBER UNIQUE,
NOMBRECLIENTE   VARCHAR(20),
DIRECCION       VARCHAR(140),
TELEFONO        NUMBER,
PRIMARY KEY (RUT),
FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE ASISTENTE (
ID_ASISTENTE    NUMBER NOT NULL, 
ID_USUARIO      NUMBER UNIQUE,
RUT             NUMBER,
NOMBREASISTENTE VARCHAR(20),
DIRECCION       VARCHAR(140),
TELEFONO        NUMBER,
PRIMARY KEY (ID_ASISTENTE),
FOREIGN KEY (ID_USUARIO) REFERENCES USUARIO(ID_USUARIO)
);

CREATE TABLE EMBARCACION (
ID_EMBARCACION  NUMBER NOT NULL,
ID_ASISTENTE    NUMBER,
TIPOEMBARCACION VARCHAR(20), 
PRECIO          NUMBER,
PATENTE         VARCHAR(20),
PRIMARY KEY (ID_EMBARCACION),
FOREIGN KEY (ID_ASISTENTE) REFERENCES ASISTENTE(ID_ASISTENTE)
);

CREATE TABLE SEGURO (
ID_SEGURO           NUMBER NOT NULL,
ID_EMBARCACION      NUMBER,
VALORSEGURO         NUMBER,
PRIMARY KEY (ID_SEGURO),
FOREIGN KEY (ID_EMBARCACION) REFERENCES EMBARCACION(ID_EMBARCACION)
);

CREATE TABLE ARRIENDO (
ID_ARRIENDO     NUMBER NOT NULL,
ID_ASISTENTE    NUMBER, 
ID_EMBARCACION  NUMBER,
RUT             NUMBER,
ID_SEGURO       NUMBER,
LUGAR_RETIRO    VARCHAR(20),
LUGAR_ENTREGA   VARCHAR(20),
HORA_RETIRO     VARCHAR2(500),
HORA_ENTREGA    VARCHAR2(500),
FECHA_RETIRO    DATE,
FECHA_ENTREGA   DATE,
VALOR           NUMBER, /*SUMA DEL BARCO + SEGURO*/ 
ESTADO          NUMBER(1,0), /*TRUE = COMO ARRENDADO & FALSE= NO ARRENDADO*/


PRIMARY KEY (ID_ARRIENDO),
FOREIGN KEY (ID_ASISTENTE)      REFERENCES ASISTENTE(ID_ASISTENTE),
FOREIGN KEY (ID_EMBARCACION)    REFERENCES EMBARCACION(ID_EMBARCACION),
FOREIGN KEY (RUT)               REFERENCES CLIENTE(RUT),
FOREIGN KEY (ID_SEGURO)         REFERENCES SEGURO(ID_SEGURO)
);

CREATE TABLE PAGO (
ID_PAGO         NUMBER NOT NULL,
ID_ARRIENDO     NUMBER,
VALOR           NUMBER, 
TIPO            VARCHAR(20),
PRIMARY KEY     (ID_PAGO),
FOREIGN KEY     (ID_ARRIENDO) REFERENCES ARRIENDO(ID_ARRIENDO)
);

CREATE TABLE ENCUESTA (
ID_ENCUESTA     NUMBER NOT NULL,
RUT             NUMBER,
ID_ARRIENDO     NUMBER, 
VALORACION      NUMBER,
COMENTARIO      VARCHAR(200),
PRIMARY KEY     (ID_ENCUESTA),
FOREIGN KEY     (RUT)           REFERENCES CLIENTE(RUT),
FOREIGN KEY     (ID_ARRIENDO)   REFERENCES ARRIENDO(ID_ARRIENDO)
);

CREATE TABLE ARRIENDOS_DISPONIBLES(
    ID_ARRIENDO_DISPONIBLES     NUMBER NOT NULL,
    ID_ARRIENDO                 NUMBER UNIQUE,
    ID_EMBARCACION              NUMBER,
    LUGAR_RETIRO                VARCHAR(20),
    LUGAR_ENTREGA               VARCHAR(20),
    FECHA_RETIRO                DATE,
    FECHA_ENTREGA               DATE,
    HORA_RETIRO                 DATE,
    HORA_ENTREGA                DATE,
    PRIMARY KEY(ID_ARRIENDO_DISPONIBLES),
    FOREIGN KEY (ID_ARRIENDO)               REFERENCES ARRIENDO(ID_ARRIENDO),
    FOREIGN KEY (ID_EMBARCACION)            REFERENCES EMBARCACION(ID_EMBARCACION)
);

------------------------------------------------------------
-- FIN TABLAS 
------------------------------------------------------------
------------------------------------------------------------
-- INGRESAR USUARIOS
------------------------------------------------------------
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (001, 'JOSE',     'CLIENTE', 12342);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (002, 'CAMILA',   'CLIENTE', 12345);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (003, 'ANA',      'CLIENTE', 12323);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (004, 'ANDRES',   'CLIENTE', 12334);

INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (010, 'ANTONIA',  'ASISTENTE', 12342);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (011, 'LUIS',     'ASISTENTE', 12345);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (012, 'ABELARDO', 'ASISTENTE', 12323);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (013, 'ANDREA',   'ASISTENTE', 12334);
INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (014, 'NICOLAS',  'ASISTENTE', 12334);

INSERT INTO USUARIO(ID_USUARIO, NOMBRE_USUARIO, TIPO, CONTRASENIA) VALUES (111, 'ADMIN',  'ADMINISTRADOR', 12345);
-------------------------------------------------------------
---INSERTAR CLIENTE
-------------------------------------------------------------
INSERT INTO CLIENTE(RUT, ID_USUARIO, NOMBRECLIENTE, DIRECCION,TELEFONO) VALUES(7952209, 001,    'JOSE ROJAS VERGARA',    'FUNDO SAN FRANCISO PERQUIN',  945412330);
INSERT INTO CLIENTE(RUT, ID_USUARIO, NOMBRECLIENTE, DIRECCION,TELEFONO) VALUES(19472440, 002,   'CAMILA SEPULVEDA ROCO', 'CAMINO LO CASTILLO SN',       974145782);
INSERT INTO CLIENTE(RUT, ID_USUARIO, NOMBRECLIENTE, DIRECCION,TELEFONO) VALUES(11208575, 003,   'ANA ABARZUA ROJAS',     'EL ROBLE 1070',               965512478);
INSERT INTO CLIENTE(RUT, ID_USUARIO, NOMBRECLIENTE, DIRECCION,TELEFONO) VALUES(17091192, 004,   'ANDRES ASTORGA RUIZ',   'RANCAGUA 3024',               956845687);
               
-------------------------------------------------------------
---INSERTAR ASISTENTE 
-------------------------------------------------------------
INSERT INTO ASISTENTE(ID_ASISTENTE, ID_USUARIO, RUT, NOMBREASISTENTE, DIRECCION, TELEFONO) VALUES(010, 010, 18456258, 'ANTONIA DIAZ VERGARA',       'CAROLINA RABAT 900', 945020245);
INSERT INTO ASISTENTE(ID_ASISTENTE, ID_USUARIO, RUT, NOMBREASISTENTE, DIRECCION, TELEFONO) VALUES(011, 011, 13302521, 'LUIS JORQUERA CANALES',      'SAN MARTIN 0775'   , 984154607);
INSERT INTO ASISTENTE(ID_ASISTENTE, ID_USUARIO, RUT, NOMBREASISTENTE, DIRECCION, TELEFONO) VALUES(012, 012, 14359599, 'ABELARDO FUENTES FUENTES',   'VENEZUELA 5901'    , 987541442);
INSERT INTO ASISTENTE(ID_ASISTENTE, ID_USUARIO, RUT, NOMBREASISTENTE, DIRECCION, TELEFONO) VALUES(013, 013, 14031260, 'ANDREA MONTALBA GONZALEZ',   'RIO QUIAPO 16'     , 965511478);
INSERT INTO ASISTENTE(ID_ASISTENTE, ID_USUARIO, RUT, NOMBREASISTENTE, DIRECCION, TELEFONO) VALUES(014, 014, 19345941, 'NICOLAS COFRE BASTIAS',      'PJE VEGA ANCOA 835', 968258128);

------------------------------------------------------------
-- INGRESAR BARCOS
------------------------------------------------------------

INSERT INTO EMBARCACION(ID_EMBARCACION, ID_ASISTENTE, TIPOEMBARCACION, PRECIO, PATENTE) VALUES(100, 010,'YATE', 1000000, 'DPTH78');
INSERT INTO EMBARCACION(ID_EMBARCACION, ID_ASISTENTE, TIPOEMBARCACION, PRECIO, PATENTE) VALUES(101, 011,'YATE', 1000000, 'DQXY25');
INSERT INTO EMBARCACION(ID_EMBARCACION, ID_ASISTENTE, TIPOEMBARCACION, PRECIO, PATENTE) VALUES(102, 012,'BARCO', 500000, 'TYSJ74');
INSERT INTO EMBARCACION(ID_EMBARCACION, ID_ASISTENTE, TIPOEMBARCACION, PRECIO, PATENTE) VALUES(103, 013,'BARCO', 500000, 'TFJK20');

-------------------------------------------------------------
---INSERTAR SEGURO
-------------------------------------------------------------
INSERT INTO SEGURO(ID_SEGURO, ID_EMBARCACION, VALORSEGURO) VALUES(021, 100, 100000);
INSERT INTO SEGURO(ID_SEGURO, ID_EMBARCACION, VALORSEGURO) VALUES(022, 101, 100000);
INSERT INTO SEGURO(ID_SEGURO, ID_EMBARCACION, VALORSEGURO) VALUES(023, 102, 150000);
INSERT INTO SEGURO(ID_SEGURO, ID_EMBARCACION, VALORSEGURO) VALUES(024, 103, 150000);

-------------------------------------------------------------
---INSERTAR ARRIENDO
-------------------------------------------------------------
INSERT INTO ARRIENDO(ID_ARRIENDO, ID_ASISTENTE, ID_EMBARCACION, RUT, ID_SEGURO, LUGAR_RETIRO, LUGAR_ENTREGA,VALOR,ESTADO,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO, HORA_ENTREGA) 
VALUES(1000, 010, 100, 7952209, 021, 'CONSTITUCION', 'CONSTITUCION',1100000,0,TO_DATE('2021/01/16','yyyy/mm/dd'),TO_DATE('2021/01/16','yyyy/mm/dd'),TO_DATE('12:00:00','hh24:mi:ss'),TO_DATE('20:00:00', ' hh24:mi:ss'));

INSERT INTO ARRIENDO(ID_ARRIENDO, ID_ASISTENTE, ID_EMBARCACION, RUT, ID_SEGURO, LUGAR_RETIRO, LUGAR_ENTREGA,VALOR,ESTADO,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO, HORA_ENTREGA)
VALUES(1001, 011, 101, 19472440, 022, 'VALPARAISO', 'VALPARAISO',11000000,0,TO_DATE('2021/01/17','yyyy/mm/dd'),TO_DATE('2021/01/17','yyyy/mm/dd'),TO_DATE('11:00:00','hh24:mi:ss'),TO_DATE('18:00:00', ' hh24:mi:ss'));

INSERT INTO ARRIENDO(ID_ARRIENDO, ID_ASISTENTE, ID_EMBARCACION, RUT, ID_SEGURO, LUGAR_RETIRO, LUGAR_ENTREGA,VALOR,ESTADO,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO, HORA_ENTREGA) 
VALUES(1002, 012, 102, 11208575, 023, 'BAHIA INGLESA', 'BAHIA INGLESA',580000,0,TO_DATE('2021/01/18','yyyy/mm/dd'),TO_DATE('2021/01/18','yyyy/mm/dd'),TO_DATE('10:00:00','hh24:mi:ss'),TO_DATE('17:00:00', ' hh24:mi:ss'));

INSERT INTO ARRIENDO(ID_ARRIENDO, ID_ASISTENTE, ID_EMBARCACION, RUT, ID_SEGURO, LUGAR_RETIRO, LUGAR_ENTREGA,VALOR,ESTADO,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO, HORA_ENTREGA) 
VALUES(1003, 013, 103, 17031192, 024, 'SAN ANTONIO', 'SAN ANTONIO',580000,0,TO_DATE('2021/01/19','yyyy/mm/dd'),TO_DATE('2021/01/19','yyyy/mm/dd'),TO_DATE('09:00:00','hh24:mi:ss'),TO_DATE('16:00:00', ' hh24:mi:ss'));

-------------------------------------------------------------
---INSERTAR PAGO
-------------------------------------------------------------
INSERT INTO PAGO(ID_PAGO,ID_ARRIENDO,VALOR,TIPO) VALUES(10000,1000,1100000,'YATE');
INSERT INTO PAGO(ID_PAGO,ID_ARRIENDO,VALOR,TIPO) VALUES(10001,1001,1100000,'YATE');
INSERT INTO PAGO(ID_PAGO,ID_ARRIENDO,VALOR,TIPO) VALUES(10002,1002,580000,'BARCO');
INSERT INTO PAGO(ID_PAGO,ID_ARRIENDO,VALOR,TIPO) VALUES(10003,1003,580000,'BARCO');

-------------------------------------------------------------
---INSERTAR ENCUESTA
-------------------------------------------------------------
INSERT INTO ENCUESTA(ID_ENCUESTA,RUT,ID_ARRIENDO,VALORACION,COMENTARIO) VALUES(100000,7952209,1000,5,'GRAX POR TANTO CARO');
INSERT INTO ENCUESTA(ID_ENCUESTA,RUT,ID_ARRIENDO,VALORACION,COMENTARIO) VALUES(100001,19472440,1001,4,'HOLITO');
INSERT INTO ENCUESTA(ID_ENCUESTA,RUT,ID_ARRIENDO,VALORACION,COMENTARIO) VALUES(100002,11208575,1002,3,'BONITO EL BARCO');
INSERT INTO ENCUESTA(ID_ENCUESTA,RUT,ID_ARRIENDO,VALORACION,COMENTARIO) VALUES(100003,17031192,1003,2,'PESIMO SERVICIO');

-------------------------------------------------------------
---ARRIENDOS DISPONIBLES
-------------------------------------------------------------
INSERT INTO ARRIENDOS_DISPONIBLES(ID_ARRIENDO_DISPONIBLES,ID_ARRIENDO,ID_EMBARCACION,LUGAR_RETIRO,LUGAR_ENTREGA,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO,HORA_ENTREGA)
VALUES(100100,1000,100,'CONSTITUCION','CONSTITUCION',TO_DATE('2021/01/16','yyyy/mm/dd'),TO_DATE('2021/01/16','yyyy/mm/dd'),TO_DATE('12:00:00','HH24:MI:SS'),TO_DATE('20:00:00', ' HH24:MI:SS'));
INSERT INTO ARRIENDOS_DISPONIBLES(ID_ARRIENDO_DISPONIBLES,ID_ARRIENDO,ID_EMBARCACION,LUGAR_RETIRO,LUGAR_ENTREGA,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO,HORA_ENTREGA)
VALUES(100101,1001,101,'VALPARAISO','VALPARAISO',TO_DATE('2021/01/20','yyyy/mm/dd'),TO_DATE('2021/01/20','yyyy/mm/dd'),TO_DATE('11:00:00','HH24:MI:SS'),TO_DATE('18:00:00', ' HH24:MI:SS'));
INSERT INTO ARRIENDOS_DISPONIBLES(ID_ARRIENDO_DISPONIBLES,ID_ARRIENDO,ID_EMBARCACION,LUGAR_RETIRO,LUGAR_ENTREGA,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO,HORA_ENTREGA)
VALUES(100102,1002,102,'BAHÍA INGLESA','BAHÍA INGLESA',TO_DATE('2021/01/18','yyyy/mm/dd'),TO_DATE('2021/01/18','yyyy/mm/dd'),TO_DATE('10:00:00','HH24:MI:SS'),TO_DATE('17:00:00', ' HH24:MI:SS'));
INSERT INTO ARRIENDOS_DISPONIBLES(ID_ARRIENDO_DISPONIBLES,ID_ARRIENDO,ID_EMBARCACION,LUGAR_RETIRO,LUGAR_ENTREGA,FECHA_RETIRO,FECHA_ENTREGA,HORA_RETIRO,HORA_ENTREGA)
VALUES(100103,1003,103,'SAN ANTONIO','SAN ANTONIO',TO_DATE('2021/01/19','yyyy/mm/dd'),TO_DATE('2021/01/19','yyyy/mm/dd'),TO_DATE('10:00:00','HH24:MI:SS'),TO_DATE('17:00:00', ' HH24:MI:SS'));


-------------------------------------------------------------
-- INICIO PROCEDURE
-------------------------------------------------------------

CREATE OR REPLACE PROCEDURE CREAR_USUARIO (

NOMBRE_USUARIO  IN USUARIO.NOMBRE_USUARIO%TYPE,
CONTRASENIA     IN USUARIO.CONTRASENIA%TYPE,
TIPO            IN CLIENTE.TIPO%TYPE,
RUTN            IN CLIENTE.RUT%TYPE,
NOMBRE_CLIENTE  IN CLIENTE.NOMBRECLIENTE%TYPE,
TELEFONO        IN CLIENTE.TELEFONO%TYPE, 
DIRECCION       IN CLIENTE.DIRECCION%TYPE,

--RETURN MENSAJE
MENSAJE     OUT     VARCHAR2,
RESULTADO   OUT     VARCHAR2
)
    IS
       CONSULTA NUMBER; 
       
    BEGIN
    
    SELECT COUNT(RUT) INTO CONSULTA FROM CLIENTE WHERE RUT = RUTN;
    IF CONSULTA = 0 THEN
        INSERT INTO CLIENTE VALUES(NOMBRE_USUARIO, CONTRASENIA, TIPO, RUTN, NOMBRECLIENTE, TELEFONO, DIRECCION, MENSAJE, RESULTADO);
        MENSAJE     := 'EL CLIENTE HA SIDO INGRESADO CON EXITO';
        RESULTADO   := 'TRUE';
        COMMIT;
    ELSE
         RESULTADO := 'FALSE';
         
    END IF;
        
        EXCEPTION
            WHEN DUP_VAL_ON_INDEX THEN
                MENSAJE := 'EL CLIENTE YA EXISTE EN LA BASE DE DATOS';
                RESULTADO := 'FALSE';
                ROLLBACK;
            WHEN OTHERS THEN
                RESULTADO := 'FALSE';
                DBMS_OUTPUT.PUT_LINE('SE HA PRODUCIDO UN ERROR AL REALIZAR LA ACCION');
                ROLLBACK;
        
END;
/

----------------------------------------------------
-- INICIAR SESION
----------------------------------------------------

CREATE OR REPLACE PROCEDURE INICIAR_SESION(

    RUTN        IN CLIENTE.RUT%TYPE,
    CONTRASENIA IN USUARIO.CONTRASENIA%TYPE,

    RESULTADO   OUT VARCHAR2,
    MENSAJE     OUT VARCHAR2)
IS
    CONTRASENA_ALMACENADA VARCHAR2(200);
BEGIN
    IF VERIFICAR_CLIENTE(RUTN) = TRUE THEN
       CONTRASENA_ALMACENADA := OBTENER_CONTRASENA(RUTN);
       IF CONTRASENIA = CONTRASENA_ALMACENADA THEN
            RESULTADO   :=  'TRUE';
            MENSAJE     :=  'HA INICIADO SESION EXITOSAMENTE';
       ELSE
            RESULTADO   :=  RUTN;
            MENSAJE     :=  CONTRASENIA;
        END IF;
    ELSE
        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'LOS DATOS INGRESADOS SON INCORRECTOS';
    END IF;
EXCEPTION
    WHEN OTHERS THEN
            RESULTADO   :=  'FALSE';
            MENSAJE     :=  'NO SE HA  INICIADO SESION';
END;
/

----------------------------------------------------
-- VERIFICAR SESION
----------------------------------------------------

CREATE OR REPLACE FUNCTION VERIFICAR_CLIENTE(
    RUT_C VARCHAR2
    )
    RETURN BOOLEAN
IS
    EXISTEC NUMBER;
BEGIN
    SELECT COUNT(*) INTO EXISTEC FROM CLIENTE WHERE RUT_C = RUT;
    IF EXISTEC > 0 THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN FALSE;
        WHEN OTHERS THEN
            RETURN FALSE;
END;
/

----------------------------------------------------
-- CONSULTAR CONTRASEÑA
----------------------------------------------------
CREATE OR REPLACE FUNCTION OBTENER_CONTRASENA(
    RUT_CLIENTE NUMBER
    )
    RETURN VARCHAR2
IS
    EXISTEC NUMBER;
    CLAVEP VARCHAR2(200);
BEGIN
    SELECT CONTRASENIA INTO CLAVEP FROM CLIENTE WHERE RUT_CLIENTE = RUT;
    DBMS_OUTPUT.PUT_LINE(CLAVEP);
    IF CLAVEP != 'NO' THEN
        RETURN CLAVEP;
    ELSE
        RETURN 'NO';
    END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 'NO';
        WHEN OTHERS THEN
            RETURN 'NO';
END;
/

----------------------------------------------------
-- ARRIENDO DISPONIBLES
----------------------------------------------------
CREATE OR REPLACE PROCEDURE CREAR_ARRIENDO(
    ID_EMBARCACION_P    IN EMBARCACION.ID_EMBARCACION%TYPE,
    ID_ASISTENTE_P      IN ASISTENTE.ID_ASISTENTE%TYPE,
    RUT_P               IN CLIENTE.RUT%TYPE,
    ID_SEGURO_P         IN SEGURO.ID_SEGURO%TYPE,
    ID_PAGO_P           IN PAGO.ID_PAGO%TYPE,
    ENTREGA_P           IN ARRIENDO.LUGAR_ENTREGA%TYPE,
    RETIRO_P            IN ARRIENDO.LUGAR_RETIRO%TYPE,
    HORA_PARTIDA        IN VARCHAR2,
    HORA_LLEGADA        IN VARCHAR2,
    PRECIO_BOLETO       IN NUMBER,

    RESULTADO           OUT VARCHAR2,
    MENSAJE             OUT VARCHAR2
    )
IS
    HORA_PARTIDA_P  ARRIENDO.FECHA_ENTREGA%TYPE := TO_CHAR(TO_DATE(FECHA_ENTREGA, 'dd-mm-yyyy hh24:mi'), 'hh24:mi');
    HORA_LLEGADA_P  ARRIENDO.FECHA_RETIRO%TYPE  := TO_CHAR(TO_DATE(FECHA_RETIRO, 'dd-mm-yyyy hh24:mi'), 'hh24:mi');
    FECHA_PARTIDA_P ARRIENDO.FECHA_ENTREGA%TYPE := TO_DATE((TO_CHAR(TO_DATE(FECHA_ENTREGA, 'dd-mm-yyyy hh24:mi'), 'dd-mm-yy')),'dd-mm-yy');
    FECHA_LLEGADA_P ARRIENDO.FECHA_RETIRO%TYPE  := TO_DATE((TO_CHAR(TO_DATE(FECHA_RETIRO, 'dd-mm-yyyy hh24:mi'), 'dd-mm-yy')),'dd-mm-yy');
    
    ACTUAL DATE := SYSDATE;
    NO_EXISTE_DISPONIBILIDAD EXCEPTION;
    FECHA_INCORRECTA EXCEPTION;
    CONSULTA_BARCO  NUMBER;
    BARCO_OCUPADO EXCEPTION;
    
BEGIN

    LOCK TABLE TABLA IN ROW EXCLUSIVE MODE;
    SELECT count(*) INTO CONSULTA_BARCO FROM ARRIENDO WHERE ID_EMBARCACION = ID_EMBARCACION_P;
    IF CONSULTA_BARCO < 1 THEN
        IF FECHA_PARTIDA_P >= TO_DATE((to_char(ACTUAL,'dd-mm-yy')),'dd-mm-yy') THEN
            LOCK TABLE ARRIENDO IN ROW EXCLUSIVE MODE;
            INSERT INTO ARRIENDO VALUES (ID_EMBARCACION_P,ID_ASISTENTE_P, RUT_P,
                                    ID_SEGURO_P,ID_PAGO_P, ENTREGA_P, RETIRO_P, HORA_PARTIDA_P,HORA_LLEGADA_P,FECHA_PARTIDA_P,
                                    FECHA_LLEGADA_P,PRECIO_BOLETO, RESULTADO, MENSAJE);
            COMMIT;
            RESULTADO   :=  'TRUE';
            MENSAJE := 'ARRIENDO INGRESADO CON EXITO';
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
        ELSE 
            RAISE FECHA_INCORRECTA;
        END IF;
    ELSE
        RAISE BARCO_OCUPADO;
    END IF;

    EXCEPTION
        WHEN FECHA_INCORRECTA THEN
            RESULTADO   :=  'FALSE';
            MENSAJE := 'NO ES POSIBLE HACER EL INGRESO DE LA FECHA INDICADA';
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
            ROLLBACK;
        WHEN BARCO_OCUPADO THEN
            RESULTADO   :=  'FALSE';
            MENSAJE := 'EL BARCO SE ENCUENTRO EN ARRIENDO ACTUALMENTE';
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
            ROLLBACK;
        WHEN OTHERS THEN
            RESULTADO   :=  'FALSE';
            MENSAJE := 'ERROR j ' ||SQLCODE;
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
            ROLLBACK;
END;
/


-------------------------
--ENCUESTA
-------------------------
CREATE OR REPLACE PROCEDURE CREAR_ENCUESTA (
    E_RUT           IN CLIENTE.RUT%TYPE,
    E_ID_ARRIENDO   IN ARRIENDO.ID_ARRIENDO%TYPE,
    E_VALORACION    IN ENCUESTA.VALORACION%TYPE,
    E_COMENTARIO    IN ENCUESTA.COMENTARIO%TYPE 
    RESULTADO   OUT VARCHAR2,
    MENSAJE     OUT VARCHAR2
)
IS
    NOEXISTECLIENTE     EXCEPTION;
    NOEXISTEARRIENDO    EXCEPTION;
    EXISTECLIENTE       NUMBER;
    EXISTEARRIENDO      NUMBER;
BEGIN

	LOCK TABLE ENCUESTA IN ROW EXCLUSIVE MODE;
    /*VALIDAR QUE EL USUARIO Y EL ARRIENDO EXISTA ENTONCES SE PUEDE INGRESAR UNA ENCUESTA*/ 
    SELECT COUNT(*) INTO EXISTECLIENTE FROM CLIENTES WHERE RUT = E_RUT;
    SELECT COUNT(*) INTO EXISTEARRIENDO FROM ARRIENDO WHERE ID_ARRIENDO = E_ID_ARRIENDO; 
    /*SI NO EXISTEN UN CLIENTE Y UN ARRIENDO NO SE PUEDE HACER LA ENCUESTA*/
    IF (EXISTECLIENTE > 0) THEN 
        IF (EXISTEARRIENDO > 0) THEN
            INSERT INTO ENCUESTA VALUES( E_RUT, E_ID_ARRIENDO, E_VALORACION, E_COMENTARIO, MENSAJE, RESULTADO);
            COMMIT;
            RESULTADO   :=  'TRUE';
            MENSAJE     :=  'SE HA CREADO CON EXITO';
        ELSE
            RAISE NOEXISTEARRIENDO;
        END IF;
    ELSE
        RAISE NOEXISTECLIENTE;
    END IF;

    EXCEPTION
        WHEN NOEXISTECLIENTE THEN
            RESULTADO   :=  'FALSE';
            MENSAJE     :=  'NO SE HA CREADO CON EXITO';
			DBMS_OUTPUT.PUT_LINE('NO HAY UN CLIENTE');
			ROLLBACK;
        WHEN NOEXISTEARRIENDO THEN
            RESULTADO   :=  'FALSE';
            MENSAJE     :=  'NO SE HA CREADO CON EXITO';
			DBMS_OUTPUT.PUT_LINE('NO EXISTE UN ARRIENDO');
			ROLLBACK;          
		WHEN OTHERS THEN
            RESULTADO   :=  'FALSE';
            MENSAJE     :=  'NO SE HA CREADO CON EXITO';
			DBMS_OUTPUT.PUT_LINE(SQLCODE ||''|| SQLERRM);
			ROLLBACK;
END;
/

-----------------------------
--PARA HACE UN PAGO
-----------------------------
CREATE OR REPLACE PROCEDURE CREAR_PAGO (
    H_VALOR         IN PAGO.VALOR%TYPE,
    H_TIPO          IN PAGO.TIPO%TYPE,

    RESULTADO   OUT VARCHAR2,
    MENSAJE     OUT VARCHAR2)
)
IS
    NOEXISTE_ARRIENDO   EXCEPTION;
    EXISTE_ARRIENDO     NUMBER;
BEGIN

    SELECT COUNT(*) INTO EXISTE_ARRIENDO FROM  WHERE ID_ARRIENDO = H_ID_ARRIENDO;
    IF (EXISTE_ARRIENDO < 0) THEN
        INSERT INTO PAGO VALUES( H_VALOR, H_TIPO, MENSAJE, RESULTADO);
        COMMIT;
        RESULTADO   :=  'TRUE';
        MENSAJE     :=  'SE HA HECHO EL PAGO CORRECTAMENTE';
       
    ELSE
        RAISE NOEXISTE_ARRIENDO;
    END IF;

    EXCEPTION
    WHEN NOEXISTE_ARRIENDO THEN

        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'NO SE HA HECHO UN PAGO';


		DBMS_OUTPUT.PUT_LINE('NO SE HA HECHO UN PAGO');
		ROLLBACK;
END;
/

----------------------------------------------------
-- INSERTAR BARCO
----------------------------------------------------
CREATE OR REPLACE PROCEDURE CREAR_EMBARCACION(
IDASISTENTE     IN EMBARCACION.ID_ASISTENTE%TYPE,
TIPOEMB         IN EMBARCACION.TIPOEMBARCACION%TYPE,
PRECIO          IN EMBARCACION.PRECIO%TYPE,
INGRESAPATENTE  IN EMBARCACION.PATENTE%TYPE,

---RETURN MENSAJE
    MENSAJE     OUT     VARCHAR2,
    RESULTADO   OUT     VARCHAR2
)

    IS 
    DECLARE @IDBARCO_ NUMBER;

    IDBARCO_ES_ NUMBER NOT NULL; 
        EXISTE BOOLEAN; 
        CONSTRAINT IDBARCO_ES_ := IDBARCO
            CHECK (IDBARCO_ES_ > 0);

--CURSOR PARA VER LOS ID DE LOS BARCOS EXISTENTES
DECLARE CURSOR CURSOR_EMB
IS 
    SELECT ID_EMBARCACION
    FROM EMBARCACION
    BEGIN
        OPEN CURSOR_EMB;
        FETCH CURSOR_EMB INTO @IDBARCO_
        IF IDBARCO_ES_ != @IDBARCO_
            THEN INSERT INTO EMBARCACION VALUES (IDASISTENTE, TIPOEMB,PRECIO, INGRESAPRECIO, INGRESAPATENTE, MENSAJE, RESULTADO);
            COMMIT;
            RESULTADO   :=  'TRUE';
            MENSAJE     :=  'SE HA INGRESADO EXITOSAMENTE';
        ELSE
            MENSAJE := "ESTA EMBARCACION YA EXISTE";
            RESULTADO   :=  'FALSE';
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE)
    EXCEPTION
        WHEN OTHERS THEN 
            RESULTADO   :=  'TRUE';
            MENSAJE := "EL BARCO HA SIDO INGRESADO CON EXITO"; /*MUESTRA MENSAJE DEL SQL*/
            DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
            ROLLBACK;
END;
/
----------------------------------------------------
-- BORRAR BARCO 
----------------------------------------------------
CREATE OR REPLACE PROCEDURE QUITAR_EMBARCACION(

    ID_EMBARCACION IN EMBARCACION.ID_EMBARCACION%TYPE,
---RETURN MENSAJE     
    RESULTADO   OUT VARCHAR2,
    MENSAJE     OUT VARCHAR2
)
-----------------BORRADO DE TIPO 
    AS
    BEGIN
        BEGIN TRY
            BEGIN TRANSACTION;
            RESULTADO := 'TRUE';
            MENSAJE := 'SE HA ELIMINADO CON EXITO';
            delete from embarcacion where EMBARCACION.ID_EMBARCACION = :idEmbarcacion;
            COMMIT TRANSACTION; 
        END TRY

        BEGIN CATCH
            EXEC usp_report_error;
            IF (XACT_STATE()) = -1
            BEGIN 
                SET MENSAJE = 'ESTA ACCION SE ENCUENTRA EN UN ESTADO NO COMPROMETIDO.';
                ROLLBACK TRANSACTION;
                RESULTADO := 'FALSE';
                MENSAJE := 'NO SE HA ELIMINADO CON EXITO';
            END;
        
            IF (XACT_STATE()) = 1
            BEGIN
                RESULTADO := 'FALSE';
                SET MENSAJE = 'ESTA ACCION NO SE ENCUENTRA COMPROMETIDA';
                COMMIT TRANSACTION;
            END;
        END CATCH
    END; 
/


----------------------------------------------------
-- FINALIZACION ARRIENDO 
----------------------------------------------------
CREATE OR REPLACE PROCEDURE FIN_ARRIENDO(
    ID_ARRIENDO_ES  IN ARRIENDO.ID_ARRIENDO%TYPE, 
    ESTADO_ES       IN ARRIENDO.ESTADO%TYPE,
--OUT 
    MENSAJE         OUT VARCHAR2, 
    RESULTADO       OUT VARCHAR2,
    ESTADO_ES       OUT BOOLEAN

    )
        IS 
            DECLARE @ID_ARRIENDO_ES NUMBER
                    @ESTADO_ES BOOLEAN

        IDARRIENDO_ESTADO NUMBER NOT NULL;
        ES_ESTADO BOOLEAN; 
            CONSTRAINT IDARRIENDO_ESTADO := ID_ARRIENDO_ES
            CHECK (IDARRIENDO_ESTADO > 0); 
            CONSTRAINT ES_ESTADO :=  ESTADO_ES;

        DECLARE CURSOR CURSOR_ESTADO 
        IS 
            SELECT ESTADO
            FROM ARRIENDO 
            WHEN ID_ARRIENDO = IDARRIENDO_ESTADO    
        
        BEGIN 
            OPEN CURSOR_ESTADO;
            FLETCH CURSOR_ESTADO INTO @ESTADO_ES; 

            IF ES_ESTADO = @ESTADO_ES THEN 
                IF @ESTADO_ES = TRUE THEN 
                    RESULTADO   :=  'FALSE';
                    MENSAJE := "LA EMBARCACIÓN SE ENCUENTRA EN ARRIENDO"
                    DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
                ELSE 
                    RESULTADO   :=  'TRUE';
                    MENSAJE := "LA EMBARCACIÓN HA FINALIZADO"
                    DBMS_OUTPUT.PUT_LINE(''||MENSAJE); 
            ELSE 
                RESULTADO   :=  'TRUE';
                INSERT INTO ARRIENDO(ESTADO) VALUES ES_ESTADO;
                COMMIT;
        EXCEPTION
            WHEN OTHERS THEN 
                RESULTADO   :=  'TRUE';
                MENSAJE := "EL ESTADO DEL BARCO A SIDO MODIFICADO"
                IF ES_ESTADO := TRUE THEN MENSAJE :="LA EMBARCACIÓN ESTÁ EN ARRIENDO"
                DBMS_OUTPUT.PUT_LINE(''||MENSAJE);
                ELSE 
                    RESULTADO   :=  'FALSE';
                    MENSAJE := "LA EMBARCACIÓN AHORA SE ENCUENTRA DISPONIBLE"
                    DBMS_OUTPUT.PUT_LINE(''||MENSAJE);    
       
        CLOSE CURSOR_ESTADO;
        END; 
        /


----------------------------------------------------------------
--USUARIOS--
----------------------------------------------------------------
--ADMINISTRADOR 
----------------------------------------------------
CREATE USER administrador IDENTIFIED BY user;
    GRANT all privileges to administrador; 

CREATE user admin IDENTIFIED by lock;
     GRANT create session to admin;
        GRANT execute   on CREAR_EMBARCACION   to admin; /*proceso de ingreso de dato*/
        GRANT execute   on QUITAR_EMBARCACION     to admin;
        GRANT SELECT    on ARRIENDO               to admin;
        GRANT SELECT    on CLIENTE                to admin; 
        GRANT SELECT    on ENCUESTA               to admin; 
        GRANT select    on ASISTENTE              to admin;
        GRANT SELECT    on EMBARCACION            to admin; 

--CLIENTE
----------------------------------------------------
CREATE user josecito IDENTIFIED by lock; /*VISTA DEL CLIENTE*/
    GRANT CREATE SESSION TO josecito;
    GRANT execute       ON INICIAR_SESION         TO josecito; 
    GRANT SELECT        ON ARRIENDO               TO josecito;
    GRANT SELECT        ON ENCUESTA               TO josecito; /*excute administrador.PROCESO DE LA ENCUESTA!!!!*/
    GRANT SELECT        ON SEGURO                 TO josecito; 
    GRANT SELECT        ON CLIENTE                TO josecito;

--CLIENTE
----------------------------------------------------
CREATE user asist IDENTIFIED by 1234; /*VISTA DEL ASISTENTE*/
    GRANT CREATE SESSION TO asist;          /*EL ASISTENTE DEBE TENER EJECUTAR LA FUNCION DE CAMBIO DE ESTADO*/
    GRANT execute       ON FIN_ARRIENDO           TO asist;
    GRANT SELECT        ON  ARRIENDO              TO asist; 
    GRANT SELECT        ON ENCUESTA               TO asist;
    GRANT SELECT        ON EMBARCACION            TO asist; 
    GRANT SELECT        ON CLIENTE                TO asist;
    GRANT SELECT        ON ASISTENTE              TO asist;


CREATE OR REPLACE PROCEDURE CREAR_ARRIENDO (
    NEW_RUT                     IN CLIENTE.RUT%TYPE,
    NEW_ID_EMBARCACION          IN EMBARCACION.ID_EMBARCACION%TYPE,
    NEW_ID_ARRIENDO_DISPONIBLES IN ARRIENDOS_DISPONIBLES.ID_ARRIENDO_DISPONIBLES%TYPE,
    NEW_ID_PAGO                 IN PAGO.ID_PAGO%TYPE,

    RESULTADO   OUT VARCHAR2,
    MENSAJE     OUT VARCHAR2
)
IS
    EXISTE_CLIENTE                  NUMBER;
    NOEXISTE_CLIENTE                EXCEPTION;

    EXISTE_EMBARACACION             NUMBER;
    NOEXISTE_EMBARCACION            EXCEPTION;

    EXISTE_ARRIENDOS_DISPONIBLES    NUMBER;
    NOEXISTE_ARRIENDOS_DISPONIBLES  EXCEPTION;

    EXISTE_ASISTENTE                NUMBER;
    NOEXISTE_ASISTENTE              EXCEPTION;

    BUSCAR_SEGURO                   NUMBER;
    PRECIO_EMBARCACION              NUMBER;
    VALORSEGURO                     NUMBER
    /*AQUI SE VAN A ALMACENAR TODOS LOS VALORES QUE CONTIENE UN REGISTRO DE LA TABLA ARRIENDOS DISPONIBLES*/
    BUSCAR_ARRIENDO_DISPONIBLE ARRIENDOS_DISPONIBLES%ROWTYPE;

BEGIN

    SELECT COUNT(*) INTO EXISTE_CLIENTE                 FROM  WHERE RUT                     = NEW_RUT;
    SELECT COUNT(*) INTO EXISTE_EMBARACACION            FROM  WHERE ID_EMBARCACION          = NEW_ID_EMBARCACION;
    SELECT COUNT(*) INTO EXISTE_ARRIENDOS_DISPONIBLES   FROM  WHERE ID_ARRIENDO_DISPONIBLES = NEW_ID_ARRIENDO_DISPONIBLES;
    SELECT COUNT(*) INTO EXISTE_ASISTENTE               FROM  WHERE ID_ASISTENTE            = NEW_ID_ASISTENTE;
    RESULTADO = FALSE;

    IF (EXISTE_CLIENTE < 0) THEN
        IF (EXISTE_EMBARACACION < 0) THEN
            IF (EXISTE_ARRIENDOS_DISPONIBLES < 0) THEN
                IF (EXISTE_ASISTENTE < 0) THEN
                    /*SE BUSCA EL ID DEL SEGURO*/
                    SELECT ID_SEGURO, VALORSEGURO INTO BUSCAR_SEGURO, PRECIO_SEGURO FROM SEGURO WHERE ID_EMBARCACION = NEW_ID_EMBARCACION;
                    SELECT * INTO BUSCAR_ARRIENDO_DISPONIBLE FROM ARRIENDOS_DISPONIBLES WHERE ID_ARRIENDO_DISPONIBLES = NEW_ID_ARRIENDO_DISPONIBLES;
                    SELECT PRECIO, ID_ASISTENTE INTO PRECIO_EMBARCACION, BUSCAR_ASISTENTE FROM EMBARCACION WHERE ID_EMBARCACION = NEW_ID_EMBARCACION;
                    RESULTADO   :=  'TRUE';
                    MENSAJE     :=  'SE HA CREADO CON EXITO';
       
                    INSERT INTO ARRIENDO VALUES(NEW_ID_ARRIENDO, BUSCAR_ASISTENTE, NEW_ID_EMBARCACION, NEW_RUT, BUSCAR_SEGURO,
                                              BUSCAR_ARRIENDO_DISPONIBLE.LUGAR_RETIRO, BUSCAR_ARRIENDO_DISPONIBLE.LUGAR_ENTREGA,
                                              BUSCAR_ARRIENDO_DISPONIBLE.FECHA_RETIRO, BUSCAR_ARRIENDO_DISPONIBLE.FECHA_ENTREGA,
                                              BUSCAR_ARRIENDO_DISPONIBLE.HORA_RETIRO, BUSCAR_ARRIENDO_DISPONIBLE.HORA_ENTREGA, 
                                              PRECIO_EMBARCACION+PRECIO_SEGURO);

                    /*HACER QUE EL ARRIENDO DEJE DE ESTAR DISPONIBLE PORQUE FUE USADO*/
                    DELETE FROM ARRIENDOS_DISPONIBLES WHERE ID_ARRIENDO_DISPONIBLES = NEW_ID_ARRIENDO_DISPONIBLES;

                    COMMIT;
                    RESULTADO = TRUE;
                
                ELSE
                     NOEXISTE_ASISTENTE EXCEPTION;
                END IF;
            ELSE
                NOEXISTE_ARRIENDOS_DISPONIBLES EXCEPTION;
            END IF;
        ELSE
            NOEXISTE_EMBARCACION EXCEPTION;
        END IF;
    ELSE 
        NOEXISTE_CLIENTE EXCEPTION;
    END IF;

    EXCEPTION
    WHEN NOEXISTE_CLIENTE THEN
        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'NO SE HA CREADO CON EXITO';
		DBMS_OUTPUT.PUT_LINE('NO SE ENCUENTRA REGISTRADO EL CLIENTE');
		ROLLBACK;

    WHEN NOEXISTE_EMBARCACION THEN
        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'NO SE HA CREADO CON EXITO';
		DBMS_OUTPUT.PUT_LINE('NO SE ENCUENTRA SELECCIONADA LA EMBARCACION');
		ROLLBACK;

    WHEN NOEXISTE_ARRIENDOS_DISPONIBLES THEN
        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'NO SE HA CREADO CON EXITO';
		DBMS_OUTPUT.PUT_LINE('NO HAY ARRIENDOS DISPONIBLES');
		ROLLBACK;

    WHEN NOEXISTE_ASISTENTE THEN
        RESULTADO   :=  'FALSE';
        MENSAJE     :=  'NO SE HA CREADO CON EXITO';
		DBMS_OUTPUT.PUT_LINE('NO HAY ASISTENTES DISPONIBLES');
		ROLLBACK;


END;
/

-------------------------------------------------------------------------
-- CREACION DE ID INCREMENTADO
------------------------------------------------------------------------

CREATE SEQUENCE Create_id_usuario
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_asistente
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_embarcacion
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_seguro
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_arriendo
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_pago
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE Create_id_encuesta
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

CREATE SEQUENCE CREATE_ID_ARRIENDOS_D
MINVALUE 1
START WITH 1
INCREMENT BY 1
CACHE 10; 

-------------------------------------------------------------------------
-- trigger
------------------------------------------------------------------------
CREATE OR REPLACE TRIGGER FORMATEAR_DATOS_CLIENTE
BEFORE INSERT ON CLIENTE
FOR EACH ROW
DECLARE 
    RUT_INVALIDO EXCEPTION;
    CLIENTE_DUPLICADO EXCEPTION;
    CONTADOR NUMBER;

BEGIN
    IF VALIDACION(:NEW.RUT) = TRUE THEN
    SELECT COUNT(*) INTO CONTADOR FROM CLIENTE WHERE RUT= :NEW.RUT;
        IF CONTADOR = 0 THEN
            :ID_USUARIO     := UPPER(NEW.ID_USUARIO);
            :NOMBRECLIENTE  := UPPER(NEW.NOMBRECLIENTE)
            :NEW.DIRECCION  := UPPER(NEW.DIRECCION);
            :TELEFONO       := UPPER(NEW.TELEFONO);
        ELSE
            RAISE CLIENTE_DUPLICADO;
            END IF;
    ELSE 
        RAISE RUT_INVALIDO;
    END IF;
    EXCEPTION
        WHEN RUT_INVALIDO THEN
            RAISE_APPLICATION_ERROR(-20001, 'RUT INVALIDO EN TRIGGER');
        WHEN CLIENTE_DUPLICADO THEN
            RAISE_APPLICATION_ERROR(-20001, 'CLIENTE DUPLICADO EN TABLA CLIENTE');
    END;
    /