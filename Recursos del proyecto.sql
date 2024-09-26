

-- Insertar departamentos
INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Departamento Academicos', NULL, 'contacto@aca.com', '123-4567', 'Edificio A, Piso 2');

INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Sistemas y Computacion', 1, 'contacto@sistemas.com', '987-6543', 'Edificio A, Piso 1');

-- Insertar usuarios
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena,permisos)
VALUES ('Marisol', 'Manjarrez', 2, NULL, 'marisol.gomez@rrhh.com', '555-2222', '123',2);

INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena,permisos)
VALUES ('Marcos', 'Rodriguez', 1, 1, 'marcos.perez@ti.com', '555-1111', '123',1);


select * from USUARIO

drop function VerificarUsuario

/*CREATE FUNCTION VerificarUsuario
(
    @usuario NVARCHAR(100),
    @contrasena NVARCHAR(20)
)
RETURNS BIT
AS
BEGIN
    DECLARE @esValido BIT;

    -- Inicializamos la variable de retorno
    SET @esValido = 0;

    -- Verificamos si el usuario existe y la contraseña es correcta
    IF EXISTS (
        SELECT 1
        FROM USUARIO
        WHERE nombre+' '+apellido = @usuario AND contrasena = @contrasena
    )
    BEGIN
        SET @esValido = 1; -- Usuario y contraseña válidos
    END

    RETURN @esValido;
END*/

--------------Ultimos recursos a ejecutar -----------------------------
--14/09/24
create PROCEDURE InsertDepartamento
    @nombre NVARCHAR(100),
    @departamentoPadreNombre NVARCHAR(100),
    @correo NVARCHAR(100),
    @telefono NVARCHAR(20),
    @ubicacion NVARCHAR(255)
AS
BEGIN
    -- Variable para almacenar el ID del departamento padre
    DECLARE @departamentoPadreID INT;

    -- Buscar el ID del departamento padre basado en el nombre
    SELECT @departamentoPadreID = id_departamento
    FROM departamento
    WHERE nombre = @departamentoPadreNombre;

    -- Insertar un nuevo departamento
    INSERT INTO departamento (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
    VALUES (@nombre, @departamentoPadreID, @correo, @telefono, @ubicacion);
END;



---------------------------------------------------------------------------------------
create PROCEDURE ActualizarDepartamento
    @id_departamento INT,
    @nombre NVARCHAR(100),
    @correo NVARCHAR(100),
    @telefono NVARCHAR(20),
    @ubicacion_dep NVARCHAR(100),
    @id_departamentoPadre INT -- Parámetro para el nombre del departamento padre
AS
BEGIN
    -- Obtener el ID del departamento padre usando el nombre
    --DECLARE @id_departamentoPadre INT;

    --SELECT @id_departamentoPadre = id_departamento
    ----FROM departamento
    --WHERE nombre = @nombre_departamentoPadre;

    -- Actualizar el departamento con los nuevos valores
    UPDATE departamento
    SET nombre = @nombre,
        id_departamentoPadre = @id_departamentoPadre,
        correo = @correo,
        telefono = @telefono,
        ubicacion_dep = @ubicacion_dep
	WHERE id_departamento = @id_departamento;
END;


/*CREATE FUNCTION VerificarPermisos
(
    @usuario NVARCHAR(100)
)
RETURNS INT
AS
BEGIN
    DECLARE @permisos INT;

    -- Inicializamos la variable de retorno
    SET @permisos = NULL;

    -- Verificamos si el usuario existe y obtenemos el valor de permisos
    SELECT @permisos = permisos
    FROM USUARIO
    WHERE nombre+' '+apellido = @usuario

    RETURN @permisos;
END*/

-----A PARTIR DE AQUÍ----------


--drop function VerificarPermisos

CREATE FUNCTION VerificarPermisos
(
    @usuario NVARCHAR(100)
)
RETURNS INT
AS
BEGIN
    DECLARE @permisos INT;

    -- Inicializamos la variable de retorno
    SET @permisos = NULL;

    -- Verificamos si el usuario existe y obtenemos el valor de permisos
    SELECT @permisos = permisos
    FROM USUARIO
    WHERE nombre+' '+apellido = @usuario

    RETURN @permisos;
END;

select dbo.VerificarPermisos ('Marisol Manjarrez')

select nombre from departamento where id_departamento = 1

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


-- Insertar tabla tipo_espacio
INSERT INTO TIPO_ESPACIO(nombre)
values('Aula');

INSERT INTO TIPO_ESPACIO(nombre)
values('Laboratorio');

INSERT INTO TIPO_ESPACIO(nombre)
values('Cubículo');


--Consulta para traer los edificios
select id_edificio, nombre from Edificio

select * from ESPACIOS

--Consulta para traer los edificios por departamento
SELECT DISTINCT E.id_edificio, E.nombre
FROM EDIFICIO E
JOIN ESPACIOS ES ON E.id_edificio = ES.id_edificio
WHERE ES.id_departamento = 1;

select id_tipoespacio from ESPACIOS where id_edificio = 6
 
 --Consulta para traer el tipo de espacio segun el edificio y departamento
SELECT DISTINCT TE.id_tipoEspacio, TE.nombre
FROM TIPO_ESPACIO TE
JOIN ESPACIOS ES ON TE.id_tipoEspacio = ES.id_tipoEspacio
WHERE ES.id_edificio = 6 AND ES.id_departamento = 1;

--Consulta para traer el espacio segun el tipo de espacio, edificio y departamento
SELECT ES.id_espacio, ES.nombre
FROM ESPACIOS ES
WHERE ES.id_tipoEspacio = 2 AND ES.id_edificio = 3 AND ES.id_departamento = 1;

--Consulta para traer el espacio, capacidad, ubicacion y nombre segun el espacio
select id_espacio, capacidad, ubicacion_esp, nombre
from ESPACIOS
where id_espacio = 9

--Consulta para eliminar un espacio
delete from ESPACIOS
where id_espacio = 1


select * from EDIFICIO

--Procedimiento almacenado para actualizar datos de edificio
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
