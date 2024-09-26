--Agrega el atributo permisos a usuarios
ALTER TABLE USUARIO
ADD permisos INT NULL;

update usuario set permisos = 1 where id_usuario = 2
update usuario set permisos = 2 where id_usuario = 1

--Agrega el atributo statuts a usuarios
ALTER TABLE USUARIO
ADD status bit NULL;
go
update usuario set status = 1 where id_usuario = 1
update usuario set status = 1 where id_usuario = 2
update usuario set status = 1 where id_usuario = 3
update usuario set status = 1 where id_usuario = 4

select * from USUARIO

--------------------------ultimo ultimo 14/09/24 11:00 am----------------------
INSERT INTO USUARIO (nombre, apellido, id_departamento_pertenece, id_jefe, correo, telefono, contrasena, permisos)
VALUES ('Mirna', 'noseque', 1, 1, 'mirnuchis@ti.com', '555-3333', '123', 0);

UPDATE USUARIO
SET permisos = 3
WHERE nombre = 'Mirna' AND apellido = 'noseque';


DROP FUNCTION IF EXISTS dbo.VerificarUsuario;

CREATE FUNCTION dbo.VerificarUsuario
(
    @usuario NVARCHAR(50),
    @contra NVARCHAR(50)
)
RETURNS TABLE
AS
RETURN
(
    SELECT 
        CASE 
            WHEN EXISTS (
                SELECT 1 
                FROM Usuario 
                WHERE nombre + ' ' + apellido = @usuario 
                AND Contrasena = @contra
            ) THEN 1 
            ELSE 0 
        END AS EsValido,
        u.id_usuario,
        u.id_departamento_pertenece
    FROM Usuario u
    WHERE u.nombre + ' ' + u.apellido = @usuario 
    AND u.Contrasena = @contra
);

select * from dbo.VerificarUsuario ('Marisol Manjarrez', '123')

select * from USUARIO
