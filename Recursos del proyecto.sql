

-- Insertar departamentos
INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Departamento Academicos', NULL, 'contacto@aca.com', '123-4567', 'Edificio A, Piso 2');

INSERT INTO DEPARTAMENTO (nombre, id_departamentoPadre, correo, telefono, ubicacion_dep)
VALUES ('Sistemas y Computacion', 1, 'contacto@sistemas.com', '987-6543', 'Edificio A, Piso 1');

-- Insertar usuarios
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena)
VALUES ('Marisol', 'Manjarrez', 2, NULL, 'marisol.gomez@rrhh.com', '555-2222', '123');

INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena)
VALUES ('Marcos', 'Rodriguez', 1, 1, 'marcos.perez@ti.com', '555-1111', '123');


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

