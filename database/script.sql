-- Eliminar las tablas si ya existen
DROP TABLE IF EXISTS RESERVA_HUESPED;

DROP TABLE IF EXISTS RESERVA_HABITACION;

DROP TABLE IF EXISTS ESTADO_PAGO;

DROP TABLE IF EXISTS RESERVA;

DROP TABLE IF EXISTS USUARIO_INTERNO;

DROP TABLE IF EXISTS HUESPED;

DROP TABLE IF EXISTS TIPO_SERVICIO;

DROP TABLE IF EXISTS HABITACION;

-- Crear las tablas
CREATE TABLE HUESPED (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    dni VARCHAR(255),
    telefono VARCHAR(255),
    mail VARCHAR(255)
);

CREATE TABLE TIPO_SERVICIO (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    nombre VARCHAR(255),
    precio FLOAT
);

CREATE TABLE HABITACION (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    tipo_habitacion VARCHAR(255),
    numero_piso INTEGER,
    precio FLOAT,
    url_imagen VARCHAR(255),
    estado VARCHAR(255)
);

CREATE TABLE ESTADO_PAGO (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    estado VARCHAR(255)
);

CREATE TABLE RESERVA (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    id_tipo_servicio BINARY(16),
    id_estado_pago BINARY(16),
    fecha_inicio DATE,
    fecha_fin DATE,
    numero_huespedes INTEGER,
    monto_pago FLOAT,
    mail_pago VARCHAR(255),
    telefono_pago VARCHAR(255),
    FOREIGN KEY (id_tipo_servicio) REFERENCES TIPO_SERVICIO(id),
    FOREIGN KEY (id_estado_pago) REFERENCES ESTADO_PAGO(id)
);

CREATE TABLE RESERVA_HABITACION (
    id_reserva BINARY(16),
    id_habitacion BINARY(16),
    PRIMARY KEY (id_reserva, id_habitacion),
    FOREIGN KEY (id_reserva) REFERENCES RESERVA(id),
    FOREIGN KEY (id_habitacion) REFERENCES HABITACION(id)
);

CREATE TABLE RESERVA_HUESPED (
    id_reserva BINARY(16),
    id_huesped BINARY(16),
    PRIMARY KEY (id_reserva, id_huesped),
    FOREIGN KEY (id_reserva) REFERENCES RESERVA(id),
    FOREIGN KEY (id_huesped) REFERENCES HUESPED(id)
);

CREATE TABLE USUARIO_INTERNO (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    rol VARCHAR(255),
    nombres VARCHAR(255),
    apellidos VARCHAR(255),
    dni VARCHAR(255),
    url_imagen VARCHAR(255),
    telefono VARCHAR(255),
    gmail VARCHAR(255),
    password VARCHAR(255),
    codigo_temporal VARCHAR(255)
);


-- Agregar restricción de clave foránea después de crear la tabla ESTADO_PAGO
ALTER TABLE
    RESERVA
ADD
    FOREIGN KEY (id_estado_pago) REFERENCES ESTADO_PAGO(id);