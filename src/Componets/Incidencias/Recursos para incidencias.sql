-- Octubre 03 de 2024
use proyectoITIL
go

INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Falla en el sistema operativo');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de rendimiento');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo de hardware');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de software');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de conectividad');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Atasco de papel');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de calidad de impresión');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de conectividad');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de configuración');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo en el dispositivo');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Error de configuración');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Fallo de puertos');
INSERT INTO TIPO_INCIDENCIA (nombre) VALUES ('Problema de calidad de escaneo');


ALTER TABLE INCIDENCIA
DROP COLUMN hora_disponible;

-- Agregar las columnas hora_disponible_inicio y hora_disponible_fin
ALTER TABLE INCIDENCIA
ADD hora_disponible_inicio TIME,
    hora_disponible_fin TIME;

--Octubre 04 de 2024
INSERT INTO PRIORIDAD (nombre, descripcion)
VALUES
('Alta', 'Tiempo de espera máximo de 1 a 2 horas para resolución inmediata.'),
('Media', 'Tiempo de espera máximo de 4 a 6 horas para resolución moderada.'),
('Baja', 'Tiempo de espera máximo de 24 a 48 horas para resolución de baja prioridad.');

INSERT INTO ESTADO_INCIDENCIA (estado_incidencia, color)
VALUES
('En Proceso', '#FFA500'),  -- Naranja: En Proceso
('Terminado', '#008000'),   -- Verde: Terminado
('Liberado', '#0000FF'),    -- Azul: Liberado
('Rechazado', '#FF0000'),   -- Rojo: Rechazado
('Enviado', '#C0C0C0');  -- Gris Claro: Enviado
