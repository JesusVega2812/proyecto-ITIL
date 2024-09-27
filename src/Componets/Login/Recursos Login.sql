
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


