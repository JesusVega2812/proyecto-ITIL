use proyectoITIL

--Procedimiento para actualizar los datos de edificio
create PROCEDURE ActualizarEdificio
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

alter PROCEDURE BajaEdificio
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
