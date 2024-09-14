
ALTER TABLE USUARIO
ADD permisos INT NULL;

update usuario set permisos = 1 where id_usuario = 2
update usuario set permisos = 2 where id_usuario = 1

select * from USUARIO


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

CREATE FUNCTION VerificarUsuario
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
END

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


/*EXEC InsertDepartamento
        @nombre = 'Mecanica',
        @departamentoPadreNombre = 'Departamento Academicos',
        @correo = 'meca@culiacan',
        @telefono = '6677225544',
        @ubicacion = null*/
