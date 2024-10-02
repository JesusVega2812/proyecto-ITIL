use proyectoITIL

-- Insertar eficios
INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio A', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio B', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio C', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio D', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio E', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio F', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio G', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio H', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio I', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio J', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio K', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio L', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio M', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio N', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio Ñ', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio O', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio P', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio Q', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio R', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio S', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio T', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio U', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio V', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio W', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio X', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio Y', 'investiga');

INSERT INTO EDIFICIO (nombre, ubicacion_edificio)
values ('Edificio Z', 'investiga');


-------------------------------------------------------------------
use proyectoITIL

--Procedimiento para actualizar los datos de edificio
alter PROCEDURE ActualizarEdificio
    @id_edificio INT,
    @nombre NVARCHAR(100),
    @ubicacion_edificio NVARCHAR(100)
AS
BEGIN
    -- Actualizar el edificio con los nuevos valores
    UPDATE EDIFICIO
    SET nombre = @nombre,
        ubicacion_edificio = @ubicacion_edificio
	WHERE id_edificio = @id_edificio;
END;

--Agregar campo estatus a la tabla edificio
ALTER TABLE edificio
ADD estatus INT DEFAULT 1;

create PROCEDURE BajaEdificio
    @id_edificio INT
AS
BEGIN
    -- Actualizar el valor del estatus de edificio a 0
    UPDATE EDIFICIO
    SET estatus = 0
	WHERE id_edificio = @id_edificio;
END;


--Modificar el valor del estatus a 1
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 1;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 2;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 3;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 4;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 5;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 6;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 7;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 8;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 9;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 10;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 11;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 12;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 13;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 14;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 15;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 16;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 17;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 18;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 19;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 20;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 21;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 22;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 23;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 24;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 25;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 26;
UPDATE EDIFICIO SET estatus = 1 WHERE id_edificio = 27;

SELECT * FROM EDIFICIO WHERE estatus = 1

exec BajaEdificio @id_edificio = 27