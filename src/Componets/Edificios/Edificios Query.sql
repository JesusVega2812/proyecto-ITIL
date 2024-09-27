use proyectoITIL

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