--Cada nombre de puerto hara una referencia a un tipo de puerto
--Ejemplo FastEthernet0/0 hara referencia a FastEtherner

CREATE TABLE TIPO_PUERTO ( --fast, giga, hdmi, usb, consola etc
	id_tipo_puerto INT PRIMARY KEY IDENTITY(1,1),
	nombre varchar(50)
);

CREATE TABLE NOMBRE_PUERTO(
	id_nombre_puerto INT PRIMARY KEY IDENTITY(1,1),
	id_tipo_puerto int not null,
	nombre_puerto varchar(50),
	CONSTRAINT FK_NombrePuerto_TipoPuerto FOREIGN KEY (id_tipo_puerto) REFERENCES TIPO_PUERTO(id_tipo_puerto)
);

-- Crear la tabla PUERTO
CREATE TABLE PUERTO (
    id_puerto INT PRIMARY KEY IDENTITY(1,1),  -- Clave primaria autoincremental
    id_equipo INT NOT NULL,                   -- Clave foránea que referencia a EQUIPO
    nombre_puerto INT,       -- Nombre del puerto (GigabitEthernet0/0, FastEthernet0/0, etc.)
    estado BIT,              -- Estado del puerto (Activo = 1, Inactivo = 0 )
    CONSTRAINT FK_Puerto_Equipo FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id_equipo),
	CONSTRAINT FK_Puerto_NombrePuerto FOREIGN KEY (nombre_puerto) REFERENCES NOMBRE_PUERTO(id_nombre_puerto)
);

-- Crear la tabla CONEXION
CREATE TABLE CONEXION (
    id_conexion INT PRIMARY KEY IDENTITY(1,1),  -- Clave primaria autoincremental
    id_puerto1 INT NOT NULL,                    -- Clave foránea que referencia al primer puerto
    id_puerto2 INT NOT NULL,                    -- Clave foránea que referencia al segundo puerto
	estado_conexion bit,						-- Activa o inactiva
    CONSTRAINT FK_Conexion_Puerto1 FOREIGN KEY (id_puerto1) REFERENCES PUERTO(id_puerto),
    CONSTRAINT FK_Conexion_Puerto2 FOREIGN KEY (id_puerto2) REFERENCES PUERTO(id_puerto)
);



