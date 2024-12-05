use ProyectoITIL
go

alter table historial_incidencias
drop constraint FK_Historial_TipoReparacion;

alter table historial_incidencias
drop constraint FK_Historial_Incidencia;

drop table TIPO_REPARACION;

alter table PARTES_REEMPLAZADAS
drop constraint FK_PartesReemplazadas_Historial;

alter table PARTES_REEMPLAZADAS
drop constraint FK_PartesReemplazadas_Parte;

alter table PARTES_REEMPLAZADAS
drop constraint PK__PARTES_R__087CB9D49B84448F;

alter table PARTES_REEMPLAZADAS
drop column id_historial;

alter table PARTES_REEMPLAZADAS
drop column cantidad;

alter table PARTES_REEMPLAZADAS
add aceptada bit;

alter table PARTES_REEMPLAZADAS
add responsable INT

drop table HISTORIAL_INCIDENCIAS;
drop table PARTES_REEMPLAZADAS;
-------------------------------------------------------------------------------
EXEC sp_rename 'PARTES_REEMPLAZADAS', 'RFC';
EXEC sp_rename 'PARTES', 'PIEZA';

-------------------------------------------------------------------------------
Create table RFC(
	pieza int not null,
	incidencia INT not null);

alter table PIEZA
drop constraint PK__PARTES__3F12D58425852F55;

alter table PIEZA
drop column id_parte;

alter table Pieza 
add id_pieza int not null identity(1,1);

alter table Pieza 
add constraint PK_Pieza primary key(id_pieza);

alter table RFC
add constraint PK_RFC primary key(pieza,incidencia);

alter table RFC 
add constraint FK_RFC_Incidencia foreign key(incidencia) references incidencia(id_incidencia);

alter table RFC 
add constraint FK_RFC_Pieza foreign key(pieza) references pieza(id_pieza);




---------------------------------
--Noviembre 02 de 2024
INSERT INTO pieza (nombre, detalle, stock) VALUES 
('CO-SE-Fuente de Poder', 'Proporciona la energ�a el�ctrica', 15),
('CO-SE-DISCO DURO', 'Almacenamiento interno de datos', 25),
('CO-SE-Memoria RAM', 'Memoria de acceso r�pido', 20),
('CO-SE-Procesador', 'Unidad de procesamiento central', 10),
('CO-SE-Placa Base', 'Soporte principal de los componentes', 8),
('IM-T�ner', 'Cartucho de tinta para impresoras', 40),
('IM-Unidad de tambor', 'Unidad de imagen para impresoras l�ser', 15),
('IM-Rodillo de papel', 'Ayuda a mover el papel en impresoras', 25),
('CO-IM-ES-Cable USB', 'Cable para conexi�n de esc�ner, impresora y computadora', 60),
('ES-Cabezal de escaneo', 'Sensor de imagen para esc�ner', 10),
('ES-L�mpara de escaneo', 'Iluminaci�n interna para el esc�ner', 15),
('CO-RO-Tarjeta de Red', 'Conexi�n a redes de datos', 12),
('RO-Antena de Router', 'Mejora la se�al de red', 30),
('RO-SW-Adaptador de corriente', 'Proporciona energ�a a routers y switches', 20),
('RO-SW-Ventilador', 'Dispositivo de enfriamiento en routers y switches', 18),
('Carcasa', 'Estructura externa para equipos', 20),
('SW-Puertos de Red', 'Conexiones para cables de red', 25),
('SW-RO-Placa de Circuito', 'Tarjeta principal en routers y switches', 10),
('SE-Controladora RAID', 'Tarjeta controladora RAID para manejo de almacenamiento en servidores', 10),
('SE-Ventilador Alta Velocidad', 'Ventilador de alta velocidad dise�ado para enfriamiento de servidores', 15),
('SE-M�dulo Expansi�n Almacenamiento', 'M�dulo de expansi�n de almacenamiento escalable para servidores', 8);

CREATE TABLE DIAGNOSTICO (
    id_diagnostico INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT
);

INSERT INTO DIAGNOSTICO (nombre, descripcion) VALUES
('Cambio de pieza', 'Sustituci�n de componentes espec�ficos del equipo debido a fallos o desgaste.'),
('CO-Limpieza de software', 'Eliminar archivos temporales y programas innecesarios para mejorar rendimiento en la computadora.'),
('CO-Actualizaci�n de software', 'Instalar actualizaciones de sistema operativo y aplicaciones para corregir errores en la computadora.'),
('CO-Configuraci�n de red', 'Ajustar o corregir configuraci�n de red para mejorar la conectividad en la computadora.'),
('CO-Problema de configuraci�n de usuario', 'Revisar permisos y configuraciones para asegurar funcionamiento adecuado de la computadora.'),
('IM-Atasco de papel', 'Retirar papel atascado de manera segura en la impresora.'),
('IM-Limpieza de cabezales', 'Realizar limpieza de cabezales de la impresora para mejorar la calidad de impresi�n.'),
('IM-Actualizaci�n de firmware', 'Instalar actualizaciones de firmware para corregir problemas de impresi�n o conexi�n en la impresora.'),
('IM-Configuraci�n de red', 'Ajuste de configuraci�n de red para asegurar conectividad de red correcta en la impresora.'),
('ES-Calibraci�n del esc�ner', 'Ajuste de configuraci�n interna para asegurar calidad de escaneo �ptima en el esc�ner.'),
('ES-Limpieza de sensor', 'Limpieza de sensor de escaneo para eliminar manchas y l�neas en documentos escaneados.'),
('ES-Configuraci�n de resoluci�n', 'Ajuste de la resoluci�n de escaneo seg�n las necesidades del usuario.'),
('RO-Reinicio de configuraci�n', 'Reiniciar configuraciones de f�brica en el router para resolver problemas de conexi�n.'),
('RO-Actualizaci�n de firmware', 'Instalar actualizaciones de firmware en el router para mejorar rendimiento y seguridad.'),
('RO-Optimizaci�n de se�al', 'Ajustar ubicaci�n o configuraci�n del router para mejorar alcance de se�al Wi-Fi.'),
('RO-Configuraci�n de seguridad', 'Configurar contrase�as y ajustes de seguridad de red en el router para proteger el acceso.'),
('SW-Revisi�n de configuraci�n de VLAN', 'Verificar configuraciones de VLAN en el switch para asegurar la correcta segmentaci�n de red.'),
('SW-Optimizaci�n de tr�fico', 'Ajustar configuraci�n del switch para mejorar el flujo de tr�fico de red.'),
('SW-Monitoreo de puertos', 'Revisar puertos del switch para asegurarse de que no est�n saturados o comprometidos.'),
('SW-Actualizaci�n de firmware', 'Instalar actualizaciones de firmware en el switch para mejorar el rendimiento y solucionar errores.'),
('SE-Cambio de pieza', 'Reemplazo de componentes espec�ficos del servidor debido a fallos o desgaste.'),
('SE-Actualizaci�n del sistema operativo', 'Instalar actualizaciones del sistema operativo del servidor para mejorar la seguridad y el rendimiento.'),
('SE-Revisi�n de seguridad', 'Evaluar la seguridad del servidor para detectar vulnerabilidades y asegurar el cumplimiento de pol�ticas.'),
('SE-Mantenimiento de disco', 'Realizar chequeo y mantenimiento de discos para asegurar el almacenamiento adecuado en el servidor.'),
('SE-Configuraci�n de red', 'Ajustar configuraci�n de red en el servidor para mejorar la conectividad y el rendimiento.'),
('SE-Optimizaci�n de rendimiento', 'Ajustes en la configuraci�n y recursos del servidor para maximizar su rendimiento.'),
('SE-Backup y restauraci�n', 'Configurar copias de seguridad o restaurar datos en el servidor en caso de fallos o p�rdida de datos.');


ALTER TABLE INCIDENCIA
ADD diagnostico INT;

select * from INCIDENCIA

ALTER TABLE INCIDENCIA
ADD CONSTRAINT FK_Incidencia_Diagnostico
FOREIGN KEY (diagnostico) REFERENCES DIAGNOSTICO(id_diagnostico);

CREATE TABLE DIAGNOSTICO_INCIDENCIA(
	id_diagnostico int not null,
	id_incidencia int not null,
	id_tipoIncidencia int,
	PRIMARY KEY (id_diagnostico, id_incidencia)
);

ALTER TABLE DIAGNOSTICO_INCIDENCIA
ADD CONSTRAINT FK_diagnosticoIncidencia_Diagnostico FOREIGN KEY (id_diagnostico) REFERENCES DIAGNOSTICO(id_diagnostico);

ALTER TABLE DIAGNOSTICO_INCIDENCIA
ADD CONSTRAINT FK_diagnosticoIncidencia_Incidencia FOREIGN KEY (id_incidencia) REFERENCES INCIDENCIA(id_incidencia);

ALTER TABLE DIAGNOSTICO_INCIDENCIA
ADD CONSTRAINT FK_DiagnosticoIncidencia_TipoIncidencia FOREIGN KEY (id_tipoIncidencia) REFERENCES tipo_incidencia(id_tipoIncidencia);

---------------- 06 de Noviembre de 2024
DELETE FROM DIAGNOSTICO WHERE nombre = 'SE-Cambio de pieza';

ALTER table pieza
ADD precioUnitario DECIMAL(9,2);

UPDATE pieza SET precioUnitario = 1500.00 WHERE nombre = 'CO-SE-Fuente de Poder';
UPDATE pieza SET precioUnitario = 300.00 WHERE nombre = 'CO-SE-DISCO DURO';
UPDATE pieza SET precioUnitario = 200.00 WHERE nombre = 'CO-SE-Memoria RAM';
UPDATE pieza SET precioUnitario = 2000.00 WHERE nombre = 'CO-SE-Procesador';
UPDATE pieza SET precioUnitario = 1200.00 WHERE nombre = 'CO-SE-Placa Base';
UPDATE pieza SET precioUnitario = 80.00 WHERE nombre = 'IM-T�ner';
UPDATE pieza SET precioUnitario = 250.00 WHERE nombre = 'IM-Unidad de tambor';
UPDATE pieza SET precioUnitario = 60.00 WHERE nombre = 'IM-Rodillo de papel';
UPDATE pieza SET precioUnitario = 15.00 WHERE nombre = 'CO-IM-ES-Cable USB';
UPDATE pieza SET precioUnitario = 600.00 WHERE nombre = 'ES-Cabezal de escaneo';
UPDATE pieza SET precioUnitario = 100.00 WHERE nombre = 'ES-L�mpara de escaneo';
UPDATE pieza SET precioUnitario = 90.00 WHERE nombre = 'CO-RO-Tarjeta de Red';
UPDATE pieza SET precioUnitario = 50.00 WHERE nombre = 'RO-Antena de Router';
UPDATE pieza SET precioUnitario = 30.00 WHERE nombre = 'RO-SW-Adaptador de corriente';
UPDATE pieza SET precioUnitario = 70.00 WHERE nombre = 'RO-SW-Ventilador';
UPDATE pieza SET precioUnitario = 500.00 WHERE nombre = 'Carcasa';
UPDATE pieza SET precioUnitario = 120.00 WHERE nombre = 'SW-Puertos de Red';
UPDATE pieza SET precioUnitario = 400.00 WHERE nombre = 'SW-RO-Placa de Circuito';
UPDATE pieza SET precioUnitario = 1600.00 WHERE nombre = 'SE-Controladora RAID';
UPDATE pieza SET precioUnitario = 950.00 WHERE nombre = 'SE-Ventilador Alta Velocidad';
UPDATE pieza SET precioUnitario = 1800.00 WHERE nombre = 'SE-M�dulo Expansi�n Almacenamiento';


-- Agregar nuevas piezas con prefijos seg�n el equipo
INSERT INTO pieza (nombre, detalle, stock, precioUnitario) VALUES 
('CO-Mouse', 'Dispositivo se�alador para computadora', 50, 250),
('CO-Teclado', 'Dispositivo de entrada para computadora', 45, 300),
('CO-Monitor', 'Pantalla externa para computadora', 20, 1500),
('CO-C�mara Web', 'C�mara para videollamadas y captura de imagen en computadoras', 30, 700),
('CO-Parlantes', 'Dispositivo de audio para computadoras', 40, 350),
('CO-IM-Adaptador HDMI', 'Adaptador de video para conectar computadoras o impresoras a pantallas HDMI', 25, 200),
('CO-IM-Cable VGA', 'Cable de video para computadoras y dispositivos de salida de video', 30, 150),
('CO-IM-ES-Cable de Alimentaci�n', 'Cable de alimentaci�n para computadoras, impresoras y esc�neres', 60, 100),
('CO-SE-UPS', 'Sistema de alimentaci�n ininterrumpida para computadoras y servidores', 10, 2500),
('CO-IM-Regleta de Alimentaci�n', 'Distribuidor de corriente para computadoras e impresoras', 20, 300);

ALTER TABLE RFC
ADD autoriza INT;

ALTER TABLE RFC
ADD autorizado INT DEFAULT 0;

CREATE TABLE historial_pieza (
    id_equipo INT,
    id_pieza INT,
    id_incidencia INT,
    fecha DATE,
    PRIMARY KEY (id_equipo, id_pieza),  -- Combinaci�n de id_equipo e id_pieza como clave primaria
    FOREIGN KEY (id_equipo) REFERENCES equipo(id_equipo),  -- Relaci�n con la tabla equipo
    FOREIGN KEY (id_pieza) REFERENCES pieza(id_pieza),  -- Relaci�n con la tabla pieza
    FOREIGN KEY (id_incidencia) REFERENCES incidencia(id_incidencia)  -- Relaci�n con la tabla incidencia
);

ALTER TABLE INCIDENCIA
ADD detalleHora BIT DEFAULT 0;

CREATE PROCEDURE AllRFC
    @id_incidencia INT,
    @id_pieza INT,
    @id_diagnostico INT,
    @id_tipoIncidencia INT,
    @id_equipo INT
AS
BEGIN
    -- Declarar una variable para almacenar el precioUnitario de la pieza
    DECLARE @precioUnitario DECIMAL(10, 2);

    -- Obtener el precioUnitario de la pieza
    SELECT @precioUnitario = precioUnitario
    FROM pieza
    WHERE id_pieza = @id_pieza;

    -- Insertar en la tabla RFC
    INSERT INTO RFC (incidencia, pieza, autorizado)
    VALUES (@id_incidencia, @id_pieza, 0);

	UPDATE INCIDENCIA 
	SET diagnostico = @id_diagnostico,
		detalleHora = 1
	WHERE id_incidencia = @id_incidencia

    -- Insertar en la tabla Diagnostico_incidencia
    INSERT INTO Diagnostico_incidencia (id_diagnostico, id_incidencia, id_tipoIncidencia)
    VALUES (@id_diagnostico, @id_incidencia, @id_tipoIncidencia);

    -- Insertar en la tabla historial_pieza
    INSERT INTO historial_pieza (id_equipo, id_pieza, id_incidencia, fecha)
    VALUES (@id_equipo, @id_pieza, @id_incidencia, GETDATE());

    -- Actualizar el campo autoriza en la tabla RFC dependiendo del precioUnitario
    UPDATE RFC
    SET autoriza = CASE 
                    WHEN @precioUnitario > 1000 THEN 2
                    ELSE 1
                  END
    WHERE incidencia = @id_incidencia AND pieza = @id_pieza;
    
END;

---------07 de Noviembre de 2024
-- Crear la tabla SERVICIOS con un ID �nico, nombre y duraci�n promedio
CREATE TABLE SERVICIOS (
    id_servicio INT IDENTITY(1,1) PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    duracion INT CHECK(duracion > 0) -- en minutos
);

-- Agregar columna FK en la tabla RFC para relacionarla con la tabla SERVICIOS
ALTER TABLE RFC
ADD id_servicio INT,
    FOREIGN KEY (id_servicio) REFERENCES SERVICIOS(id_servicio);

INSERT INTO SERVICIOS (nombre, duracion) VALUES 
('Cambio de Fuente de Poder', 75),
('Cambio de Disco Duro', 90),
('Cambio de Memoria RAM', 60),
('Cambio de Procesador', 120),
('Cambio de Placa Base', 150),
('Cambio de Mouse', 40),
('Cambio de Teclado', 40),
('Cambio de Monitor', 60),
('Cambio de C�mara Web', 45),
('Cambio de Parlantes', 45),
('Cambio de Lamparar', 50),
('Limpieza de software en Computadora', 50),
('Actualizaci�n de software en Computadora', 60),
('Configuraci�n de red en Computadora', 70),
('Soluci�n de atascos en Impresora', 45),
('Limpieza de cabezales en Impresora', 55),
('Actualizaci�n de firmware en Impresora', 60),
('Calibraci�n de Esc�ner', 50),
('Limpieza de sensor de Esc�ner', 45),
('Reinicio de configuraci�n de Router', 50),
('Optimizaci�n de se�al de Router', 65),
('Configuraci�n de seguridad de Router', 55), 
('Revisi�n de configuraci�n de VLAN en Switch', 60),
('Optimizaci�n de tr�fico en Switch', 60), 
('Cambio de Controladora RAID en Servidor', 110),
('Mantenimiento de disco en Servidor', 70),  
('Configuraci�n de red en Servidor', 75),  
('Backup y restauraci�n en Servidor', 90);

ALTER TABLE RFC
ADD hora_inicial TIME,
    hora_final TIME;

----08 de Noviembre de 2024
ALTER TABLE INCIDENCIA
ADD servicio BIT DEFAULT 0;

---09 de Noviembre de 2024
SELECT 
    hora_inicial, 
    hora_final, 
    DATEDIFF(MINUTE, hora_inicial, hora_final) AS duracion_minutos
FROM RFC
where incidencia = 0;

ALTER TABLE incidencia
ADD calificacion INT;

ALTER TABLE tecnico
ADD promedio_calificaciones DECIMAL(3, 2);

------19 de Noviembre de 2024
UPDATE INCIDENCIA
SET id_estado = 2
where id_incidencia = 2

-- NOVIEMBRE 23 de 2024


--Tecnico encargado de cada especialdidad
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos, status)
VALUES 
    ('Miguel', 'Perez', 2, 1, 'Miguel.perez@correo.com', '1234567890', '123', 5, 1),
    ('Carlos', 'Lopez', 2, 1, 'Carlos.lopez@correo.com', '0987654321', '123', 5, 1),
    ('Luis', 'Mart�nez', 2, 1, 'luis.martinez@correo.com', '1122334455', '123', 5, 1);

ALTER TABLE TECNICO
ADD jefe BIT NOT NULL DEFAULT 0;

INSERT INTO TECNICO (id_usuario, id_especializacion, id_estadoDisponibilidad, jefe)
VALUES
(11, 1, 1, 1),
(12, 2, 1, 1),
(13, 3, 1, 1);

----------------------------------------------------------------------------------------------------------------------
ALTER TABLE INCIDENCIA
ADD problema BIT DEFAULT 0;

CREATE TABLE CAUSA_RAIZ (
    id_causa_raiz INT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(255)
);

INSERT INTO CAUSA_RAIZ (nombre, descripcion) VALUES 
('Error humano', 'Acciones o decisiones incorrectas realizadas por el usuario o t�cnico.'),
('Fallo el�ctrico', 'Interrupciones o fluctuaciones en el suministro de energ�a el�ctrica.'),
('Obsolescencia de hardware', 'Equipos que han superado su vida �til o ya no cumplen los est�ndares actuales.'),
('Conflicto de software', 'Incompatibilidad entre aplicaciones o sistemas operativos.'),
('Mal mantenimiento', 'Falta de limpieza, actualizaciones o revisiones regulares en el equipo.'),
('Configuraci�n incorrecta', 'Errores en la configuraci�n de sistemas, redes o dispositivos.'),
('Desgaste f�sico', 'Deterioro natural de los componentes debido al uso prolongado.'),
('Ataque cibern�tico', 'Acceso no autorizado o da�o intencional a los sistemas inform�ticos.'),
('Problemas clim�ticos', 'Impactos relacionados con el clima, como humedad, calor extremo o fr�o.'),
('Error en actualizaciones', 'Problemas derivados de actualizaciones de software o firmware defectuosas.'),
('Problema de compatibilidad', 'Falta de compatibilidad entre dispositivos, sistemas o versiones.'),
('Error de fabricaci�n', 'Defectos en componentes o equipos desde su producci�n.'),
('Fallo de conectividad', 'P�rdida o interrupci�n en las conexiones de red o cables.'),
('Sobrecarga del sistema', 'Uso excesivo de los recursos que supera la capacidad del equipo.'),
('Falla de seguridad', 'Brechas en medidas de seguridad que exponen datos o sistemas a riesgos.');

CREATE TABLE errores (
    id_error INT IDENTITY(1,1) PRIMARY KEY,
	descripcion VARCHAR(100),
    causa_raiz INT
);

ALTER TABLE errores
ADD CONSTRAINT FK_Errores_CausaRaiz
FOREIGN KEY (causa_raiz) REFERENCES CAUSA_RAIZ(id_causa_raiz);

ALTER TABLE INCIDENCIA
ADD id_error INT NULL,
CONSTRAINT FK_Incidencias_Error FOREIGN KEY (id_error) REFERENCES errores(id_error);

ALTER TABLE INCIDENCIA
ADD errorConocido INT NULL;

ALTER TABLE INCIDENCIA
ADD eC bit NULL;

ALTER TABLE INCIDENCIA
ADD btnDiag bit default 0 NOT NULL;

ALTER TABLE INCIDENCIA
ADD btnAutorizacion bit default 0 NOT NULL;

ALTER TABLE INCIDENCIA
ADD det bit default 0 NOT NULL;



--- Diciembre 12
select * from estado_incidencia

update estado_incidencia
set color = '#2E8B57' where id_estado = 2

select * from tecnico

select t.id_usuario, u.nombre+' '+u.apellido as nombre, t.num_incidencias from TECNICO T
JOIN ESPECIALIZACION E ON e.id_especializacion = t.id_especializacion
JOIN USUARIO U ON u.id_usuario = t.id_usuario
WHERE e.id_especializacion = 1 and t.id_estadoDisponibilidad = 1 AND t.jefe != 1;

select * from INCIDENCIA

select * from usuario

select * from SERVICIOS