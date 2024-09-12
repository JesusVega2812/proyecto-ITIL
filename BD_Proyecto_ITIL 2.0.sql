CREATE DATABASE proyectoITIL
go
USE proyectoITIL
go

-- Tabla: DEPARTAMENTO
CREATE TABLE DEPARTAMENTO (
    id_departamento INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    --es_subdepartamento BOOLEAN,
    --id_edificio INT NOT NULL,
    id_departamentoPadre INT,
    --id_usuarioResponsable INT NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(20),
    ubicacion_dep VARCHAR(255)
);

-- Tabla: USUARIO
CREATE TABLE USUARIO (
    id_usuario INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    id_departamento_pertenece INT NOT NULL,
	id_jefe int,
    correo VARCHAR(100),
    telefono VARCHAR(20),
	contrasena varchar(20) NOT NULL
);

-- Tabla: EQUIPO
CREATE TABLE EQUIPO (
    id_equipo INT IDENTITY PRIMARY KEY NOT NULL,
    id_espacio INT,
    numero_serie VARCHAR(100),
    fecha_compra DATE,
    fecha_instalacion DATE,
    valor_compra numeric(6,2),
    id_usuario INT,
    id_modelo INT,
    --id_contratoSoporte INT,
	id_garantia INT,
	estado_equipo VARCHAR(20) --EN USO, REPARACION, YA NO SIRVE
);

-- Tabla: COMPUTADORA
CREATE TABLE COMPUTADORA (
    id_computadora INT IDENTITY PRIMARY KEY NOT NULL,
    id_tipoComputadora INT NOT NULL,
    procesador INT NOT NULL,
    memoria_RAM VARCHAR(10) NOT NULL,
    almacenamiento VARCHAR(10) NOT NULL,
    tarjeta_grafica INT,
    sistema_operativo INT,
    configuracion_red INT
);

-- Tabla: IMPRESORA
CREATE TABLE IMPRESORA (
    id_impresora INT IDENTITY PRIMARY KEY NOT NULL,
    id_tipoImpresora INT NOT NULL,
    resolucion VARCHAR(100),
    velocidad_impresion VARCHAR(20),
	conectividad VARCHAR(20)
);

-- Crear tabla SERVIDOR
CREATE TABLE SERVIDOR (
    id_servidor INT IDENTITY PRIMARY KEY NOT NULL,
    procesador INT NOT NULL,
    memoria_RAM VARCHAR(10) NOT NULL,
    almacenamiento VARCHAR(10) NOT NULL,
    tarjeta_grafica INT,
    sistema_operativo INT,
    configuracion_red INT
);

-- Crear tabla SWITCH
CREATE TABLE SWITCH (
    id_switch INT PRIMARY KEY IDENTITY,
    numero_puertos INT NOT NULL,
    velocidad_backplane DECIMAL(6,2) NOT NULL,
    tipo_switch VARCHAR(50),
    capacidad_switching DECIMAL(6,2),
    consumo_energia DECIMAL(6,2),
);

-- Crear tabla ROUTER
CREATE TABLE ROUTER (
    id_router INT PRIMARY KEY IDENTITY,
    tipo_conexion VARCHAR(50) NOT NULL,
    soporte_vpn BIT NOT NULL,
    numero_interfaces_giga_fast INT,
	numero_seriales INT,
    frecuencia_ruta DECIMAL(6,2),
    protocolos_ruta VARCHAR(100),
    capacidad_ruta DECIMAL(6,2),
    consumo_energia DECIMAL(6,2),
);

-- Crear tabla ESCANER
CREATE TABLE ESCANER (
    id_escaner INT IDENTITY PRIMARY KEY NOT NULL,
    velocidad VARCHAR(20),
    id_tipoEscaner INT NOT NULL
);

-- Crear tabla TIPO_ESCANER
CREATE TABLE TIPO_ESCANER (
    id_tipoEscaner INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(100) NOT NULL
);
CREATE TABLE TIPO_COMPUTADORA (
	id_tipoComputadora INT IDENTITY PRIMARY KEY,
	nombre VARCHAR(30)
);

CREATE TABLE TIPO_IMPRESORA (
	id_tipoImpresora INT IDENTITY PRIMARY KEY,
	nombre VARCHAR(30)
);

-- Crear tabla SOFTWARE
CREATE TABLE SOFTWARE (
    id_software INT PRIMARY KEY IDENTITY,
    nombre VARCHAR(100) NOT NULL,
    version_ VARCHAR(50) NOT NULL,
    proveedor VARCHAR(100),
    tipo_licencia VARCHAR(50),
    codigo_licencia VARCHAR(100),
    clave_activacion VARCHAR(100)
);

-- Crear tabla SOFTWARE_COMPUTADORA (relación muchos a muchos entre SOFTWARE y COMPUTADORA)
CREATE TABLE SOFTWARE_COMPUTADORA (
    id_software INT NOT NULL,
    id_computadora INT NOT NULL,
    PRIMARY KEY (id_software, id_computadora)
);

-- Tabla: SISTEMA_OPERATIVO
CREATE TABLE SISTEMA_OPERATIVO (
    id_sistema INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    version_ VARCHAR(50) NOT NULL,
    interfaz VARCHAR(3) NOT NULL,
    licencia VARCHAR(100) NOT NULL
);

-- Tabla: PROCESADOR
CREATE TABLE PROCESADOR (
    id_procesador INT IDENTITY PRIMARY KEY NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    nucleos INT NOT NULL,
    hilos INT,
    cache INT
);

-- Tabla: TARJETA_GRAFICA
CREATE TABLE TARJETA_GRAFICA (
    id_tarjeta INT IDENTITY PRIMARY KEY NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    arquitectura VARCHAR(100)
);

-- Tabla: TARJETA_RED
CREATE TABLE TARJETA_RED (
    id_tarjeta INT IDENTITY PRIMARY KEY NOT NULL,
    fabricante VARCHAR(100) NOT NULL,
    modelo VARCHAR(100)
);

-- Tabla: MODELO
CREATE TABLE MODELO (
    id_modelo INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    id_marca INT NOT NULL,
    año_lanzamiento INT
);

-- Tabla: MARCA
CREATE TABLE MARCA (
    id_marca INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: GARANTIA
CREATE TABLE GARANTIA (
    id_garantia INT IDENTITY PRIMARY KEY NOT NULL,
    id_equipo INT NOT NULL,
    cobertura VARCHAR(255),
    fecha_inicio DATE NOT NULL,
    fecha_final DATE NOT NULL,
	id_proveedor INT
);

-- Tabla: PROVEEDOR
CREATE TABLE PROVEEDOR (
    id_proveedor INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
	contacto_soporte VARCHAR(20),
	email_soporte varchar(100),
    servicios_ofrecidos TEXT
);

-- Tabla: EDIFICIO
CREATE TABLE EDIFICIO (
    id_edificio INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    ubicacion_edificio VARCHAR(255)
);

-- Tabla: ESPACIOS
CREATE TABLE ESPACIOS (
    id_espacio INT IDENTITY PRIMARY KEY NOT NULL,
    id_tipoEspacio INT NOT NULL,
    id_edificio INT NOT NULL,
	id_departamento INT NOT NULL,
    ubicacion_esp VARCHAR(255),
	capacidad INT,
	nombre VARCHAR(10)
);

-- Tabla: TIPO_ESPACIO
CREATE TABLE TIPO_ESPACIO (
    id_tipoEspacio INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(100)
);

-- Tabla: INCIDENCIA
CREATE TABLE INCIDENCIA (
    id_incidencia INT IDENTITY PRIMARY KEY NOT NULL,
    id_equipo INT NOT NULL,
    descripcion TEXT,
    fecha DATE NOT NULL,
    hora_envio TIME NOT NULL,
	hora_disponible TIME,
    id_prioridad INT,
    id_estado INT,
    id_tecnicoAsignado INT,
	id_tipoIncidencia INT
);

-- Tabla: INCIDENCIA_LUGAR
CREATE TABLE INCIDENCIA_LUGAR (
    id_incidencia INT,
    id_espacio INT,
    PRIMARY KEY (id_incidencia, id_espacio)
);

-- Tabla: TIPO_INCIDENCIA
CREATE TABLE TIPO_INCIDENCIA (
    id_tipoIncidencia INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla: PRIORIDAD
CREATE TABLE PRIORIDAD (
    id_prioridad INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla: ESTADO_INCIDENCIA
CREATE TABLE ESTADO_INCIDENCIA (
    id_estado INT IDENTITY PRIMARY KEY NOT NULL,
    estado_incidencia VARCHAR(100) NOT NULL,
    color VARCHAR(10) NOT NULL
);

-- Tabla: TECNICO
CREATE TABLE TECNICO (
    id_usuario INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    id_especializacion INT,
    id_estadoDisponibilidad INT
);

-- Tabla: ESPECIALIZACION
CREATE TABLE ESPECIALIZACION (
    id_especializacion INT IDENTITY PRIMARY KEY NOT NULL,
    nombre VARCHAR(100)
);

-- Tabla: ESTADO_DISPONIBILIDAD
CREATE TABLE ESTADO_DISPONIBILIDAD (
    id_estadoDisponibilidad INT PRIMARY KEY NOT NULL,
    estado VARCHAR(100) NOT NULL
);

-- Tabla: HISTORIAL_INCIDENCIAS
CREATE TABLE HISTORIAL_INCIDENCIAS (
    id_historial INT IDENTITY PRIMARY KEY NOT NULL,
    id_incidencia INT NOT NULL,
    fecha_resuelta DATE NOT NULL,
    id_tipo_reparacion INT,
    partes_reemplazadas VARCHAR(255),
    fecha_ultimo_mantenimiento DATE
);

-- Tabla: TIPO_REPARACION
CREATE TABLE TIPO_REPARACION (
    id_tipo_reparacion INT IDENTITY PRIMARY KEY NOT NULL,
    nombre_reparacion VARCHAR(100) NOT NULL,
    detalle_reparacion TEXT
);

-- Tabla: PARTES_REEMPLAZADAS
CREATE TABLE PARTES_REEMPLAZADAS (
    id_parte INT NOT NULL,
	id_historial INT NOT NULL,
    cantidad INT,
	PRIMARY KEY(id_parte,id_historial)
);
CREATE TABLE PARTES (
	id_parte INT IDENTITY PRIMARY KEY NOT NULL,
	nombre VARCHAR(50) NOT NULL,
	detalle VARCHAR(100),
	stock INT
);

/*use master
drop database proyectoITIL*/

/*----------------------------------------------------------------------*/
-- Tabla: DEPARTAMENTO
--ALTER TABLE DEPARTAMENTO
--ADD CONSTRAINT FK_Departamento_Edificio FOREIGN KEY (id_edificio) REFERENCES EDIFICIO(id_edificio);
--ALTER TABLE DEPARTAMENTO
--ADD CONSTRAINT FK_Departamento_Responsable FOREIGN KEY (id_usuarioResponsable) REFERENCES USUARIO(id_usuario);
ALTER TABLE DEPARTAMENTO
ADD CONSTRAINT FK_Departamento_padre FOREIGN KEY (id_departamentopadre) REFERENCES DEPARTAMENTO(id_departamento);

-- Tabla: USUARIO
ALTER TABLE USUARIO
ADD CONSTRAINT FK_Usuario_Departamento FOREIGN KEY (id_departamento_pertenece) REFERENCES DEPARTAMENTO(id_departamento);

-- Tabla: EQUIPO
ALTER TABLE EQUIPO
ADD CONSTRAINT FK_Equipo_Espacio FOREIGN KEY (id_espacio) REFERENCES ESPACIOS(id_espacio);

ALTER TABLE EQUIPO
ADD CONSTRAINT FK_Equipo_Usuario FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario);

ALTER TABLE EQUIPO
ADD CONSTRAINT FK_Equipo_Modelo FOREIGN KEY (id_modelo) REFERENCES MODELO(id_modelo);

-- Tabla: COMPUTADORA
ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TipoComputadora FOREIGN KEY (id_tipoComputadora) REFERENCES TIPO_COMPUTADORA(id_tipoComputadora);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_Procesador FOREIGN KEY (procesador) REFERENCES PROCESADOR(id_procesador);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TarjetaGrafica FOREIGN KEY (tarjeta_grafica) REFERENCES TARJETA_GRAFICA(id_tarjeta);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_SistemaOperativo FOREIGN KEY (sistema_operativo) REFERENCES SISTEMA_OPERATIVO(id_sistema);

ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_Computadora_TarjetaRed FOREIGN KEY (configuracion_red) REFERENCES TARJETA_RED(id_tarjeta);

-- Tabla: IMPRESORA
ALTER TABLE IMPRESORA
ADD CONSTRAINT FK_Impresora_TipoImpresora FOREIGN KEY (id_tipoImpresora) REFERENCES TIPO_IMPRESORA(id_tipoImpresora);

-- Tabla: SERVIDOR
ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_Procesador FOREIGN KEY (procesador) REFERENCES PROCESADOR(id_procesador);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_TarjetaGrafica FOREIGN KEY (tarjeta_grafica) REFERENCES TARJETA_GRAFICA(id_tarjeta);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_SistemaOperativo FOREIGN KEY (sistema_operativo) REFERENCES SISTEMA_OPERATIVO(id_sistema);

ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_Servidor_TarjetaRed FOREIGN KEY (configuracion_red) REFERENCES TARJETA_RED(id_tarjeta);

-- Tabla: SWITCH
ALTER TABLE SWITCH
ADD CONSTRAINT FK_Switch_Equipo FOREIGN KEY (id_switch) REFERENCES EQUIPO(id_equipo);

-- Tabla: ROUTER
ALTER TABLE ROUTER
ADD CONSTRAINT FK_Router_Equipo FOREIGN KEY (id_router) REFERENCES EQUIPO(id_equipo);

-- Tabla: ESCANER
ALTER TABLE ESCANER
ADD CONSTRAINT FK_Escaner_TipoEscaner FOREIGN KEY (id_tipoEscaner) REFERENCES TIPO_ESCANER(id_tipoEscaner);

-- Tabla: SOFTWARE_COMPUTADORA
ALTER TABLE SOFTWARE_COMPUTADORA
ADD CONSTRAINT FK_SoftwareComputadora_Software FOREIGN KEY (id_software) REFERENCES SOFTWARE(id_software);

ALTER TABLE SOFTWARE_COMPUTADORA
ADD CONSTRAINT FK_SoftwareComputadora_Computadora FOREIGN KEY (id_computadora) REFERENCES COMPUTADORA(id_computadora);

-- Tabla: GARANTIA
ALTER TABLE GARANTIA
ADD CONSTRAINT FK_Garantia_Equipo FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id_equipo);

-- Tabla: ESPACIOS
ALTER TABLE ESPACIOS
ADD CONSTRAINT FK_Espacios_TipoEspacio FOREIGN KEY (id_tipoEspacio) REFERENCES TIPO_ESPACIO(id_tipoEspacio);

ALTER TABLE ESPACIOS
ADD CONSTRAINT FK_Espacios_Edificio FOREIGN KEY (id_edificio) REFERENCES EDIFICIO(id_edificio);

ALTER TABLE ESPACIOS
ADD CONSTRAINT FK_Espacios_Departamento FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento);

-- Tabla: INCIDENCIA
ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_Equipo FOREIGN KEY (id_equipo) REFERENCES EQUIPO(id_equipo);

ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_Prioridad FOREIGN KEY (id_prioridad) REFERENCES PRIORIDAD(id_prioridad);

ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_EstadoIncidencia FOREIGN KEY (id_estado) REFERENCES ESTADO_INCIDENCIA(id_estado);

ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_TecnicoAsignado FOREIGN KEY (id_tecnicoAsignado) REFERENCES TECNICO(id_usuario);

ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_Tipo FOREIGN KEY (id_tipoIncidencia) REFERENCES TIPO_INCIDENCIA(id_tipoIncidencia);

-- Tabla: INCIDENCIA_LUGAR
ALTER TABLE INCIDENCIA_LUGAR
ADD CONSTRAINT FK_IncidenciaLugar_Incidencia FOREIGN KEY (id_incidencia) REFERENCES INCIDENCIA(id_incidencia);

ALTER TABLE INCIDENCIA_LUGAR
ADD CONSTRAINT FK_IncidenciaLugar_Espacio FOREIGN KEY (id_espacio) REFERENCES ESPACIOS(id_espacio);

-- Tabla: HISTORIAL_INCIDENCIAS
ALTER TABLE HISTORIAL_INCIDENCIAS
ADD CONSTRAINT FK_Historial_Incidencia FOREIGN KEY (id_incidencia) REFERENCES INCIDENCIA(id_incidencia);

ALTER TABLE HISTORIAL_INCIDENCIAS
ADD CONSTRAINT FK_Historial_TipoReparacion FOREIGN KEY (id_tipo_reparacion) REFERENCES TIPO_REPARACION(id_tipo_reparacion);

-- Tabla: PARTES_REEMPLAZADAS
ALTER TABLE PARTES_REEMPLAZADAS
ADD CONSTRAINT FK_PartesReemplazadas_Parte FOREIGN KEY (id_parte) REFERENCES PARTES(id_parte);

ALTER TABLE PARTES_REEMPLAZADAS
ADD CONSTRAINT FK_PartesReemplazadas_Historial FOREIGN KEY (id_historial) REFERENCES HISTORIAL_INCIDENCIAS(id_historial);

-- Computadora: La llave primaria de COMPUTADORA es una clave foránea de EQUIPO
ALTER TABLE COMPUTADORA
ADD CONSTRAINT FK_COMPUTADORA_EQUIPO
FOREIGN KEY (id_computadora) REFERENCES EQUIPO(id_equipo);

-- Impresora: La llave primaria de IMPRESORA es una clave foránea de EQUIPO
ALTER TABLE IMPRESORA
ADD CONSTRAINT FK_IMPRESORA_EQUIPO
FOREIGN KEY (id_impresora) REFERENCES EQUIPO(id_equipo);

-- Escáner: La llave primaria de ESCANER es una clave foránea de EQUIPO
ALTER TABLE ESCANER
ADD CONSTRAINT FK_ESCANER_EQUIPO
FOREIGN KEY (id_escaner) REFERENCES EQUIPO(id_equipo);

-- Servidor: La llave primaria de SERVIDOR es una clave foránea de EQUIPO
ALTER TABLE SERVIDOR
ADD CONSTRAINT FK_SERVIDOR_EQUIPO
FOREIGN KEY (id_servidor) REFERENCES EQUIPO(id_equipo);

--Tabla: MODELO
ALTER TABLE MODELO
ADD CONSTRAINT FK_MODELO_MARCA
FOREIGN KEY (id_marca) REFERENCES MARCA(id_marca);

--Tabla: GARANTIA
ALTER TABLE GARANTIA
ADD CONSTRAINT FK_GARANTIA_PROVEEDOR
FOREIGN KEY (id_proveedor) REFERENCES PROVEEDOR(id_proveedor);

--Tabla: TECNICO
ALTER TABLE TECNICO
ADD CONSTRAINT FK_TECNICO_ESTADO
FOREIGN KEY (id_estadoDisponibilidad) REFERENCES ESTADO_DISPONIBILIDAD(id_estadoDisponibilidad);

ALTER TABLE TECNICO
ADD CONSTRAINT FK_TECNICO_ESPECIALIZACION
FOREIGN KEY (id_especializacion) REFERENCES ESPECIALIZACION(id_especializacion);